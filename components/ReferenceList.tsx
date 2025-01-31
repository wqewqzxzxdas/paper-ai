import React, { useState } from "react";

import { Reference } from "@/utils/global";
import {
  copyToClipboard,
  formatReferenceForCopy,
  formatAllReferencesForCopy,
  delteIndexUpdateBracketNumbersInDeltaKeepSelection,
} from "@/utils/others/quillutils";
//删除文献按钮
import ParagraphDeleteButton from "@/components/ParagraphDeleteInterface";

//redux
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  addReferenceRedux,
  removeReferenceRedux,
  clearReferencesRedux,
  swapReferencesRedux,
} from "@/app/store/slices/authSlice";

type ReferenceListProps = {
  editor: any;
};

function ReferenceList({ editor }: ReferenceListProps) {
  // console.log("editor in ReferenceList", editor);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newPublisher, setNewPublisher] = useState("");
  const [newUrl, setNewUrl] = useState("");
  //redux
  const dispatch = useAppDispatch();
  const references = useAppSelector((state) => state.auth.referencesRedux);

  function moveReferenceUp(index: number) {
    console.log("index", index);

    if (index <= 0 || index >= references.length) {
      console.log("index", index);
      return; // Index out of bounds or first element
    }
    dispatch(swapReferencesRedux({ indexA: index, indexB: index - 1 }));
  }

  function moveReferenceDown(index: number) {
    console.log("index", index);
    if (index < 0 || index >= references.length - 1) {
      console.log("index", index);
      return; // Index out of bounds or last element
    }

    dispatch(swapReferencesRedux({ indexA: index, indexB: index + 1 }));
  }

  function removeReferenceUpdateIndex(index: number, rmPg = false) {
    handleRemoveReference(index);
    delteIndexUpdateBracketNumbersInDeltaKeepSelection(editor, index, rmPg);
  }

  const handleAddReference = (newReference: Reference) => {
    dispatch(addReferenceRedux(newReference));
  };

  const handleRemoveReference = (index: number) => {
    dispatch(removeReferenceRedux(index));
  };

  const handleClearReferences = () => {
    dispatch(clearReferencesRedux());
  };
  return (
    <div className="container mx-auto p-4">
      {/* 表单区域 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddReference({
            title: newTitle,
            author: newAuthor,
            year: newYear,
            venue: newPublisher,
            url: newUrl,
          });
          // 清空表单
          setNewTitle("");
          setNewAuthor("");
          setNewYear("");
          setNewPublisher("");
          setNewUrl("");
        }}
        className="mb-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <input
            className="border p-2 rounded"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            className="border p-2 rounded"
            type="text"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            placeholder="Author"
          />
          <input
            className="border p-2 rounded"
            type="text"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            placeholder="Year"
          />
          <input
            className="border p-2 rounded"
            type="text"
            value={newPublisher}
            onChange={(e) => setNewPublisher(e.target.value)}
            placeholder="Publisher"
          />
          <input
            className="border p-2 rounded"
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="URL"
          />
        </div>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded "
              type="submit"
            >
              添加自定义引用
            </button>

            <button
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded "
              type="button"
              onClick={() =>
                copyToClipboard(formatAllReferencesForCopy(references))
              }
            >
              复制所有引用
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
              type="button"
              // onClick={() => setReferences([])} // 设置引用列表为空数组
              onClick={() => handleClearReferences()}
            >
              删除所有引用
            </button>
          </div>
        </div>
      </form>
      {/* 引用列表显示区域 */}
      <ul>
        {references &&
          references.map(
            (reference, index) =>
              reference && (
                <li key={index} className="mb-3 p-2 border-b">
                  {/* 显示序号 */}
                  <span className="font-bold mr-2">[{index + 1}].</span>
                  {reference.author}. {reference.title}.{" "}
                  {/* 判断 journal 字段是否存在 */}
                  {reference.journal ? (
                    <span>reference.journal. </span>
                  ) : (
                    <span>
                      {reference.venue}, {reference.year}.
                    </span>
                  )}
                  {reference.url && (
                    <a
                      href={reference.url}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`[${(index + 1).toString()}]`}
                    >
                      {" "}
                      ({reference.url})
                    </a>
                  )}
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 ml-2 rounded"
                    onClick={() => moveReferenceUp(index)}
                  >
                    ↑
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 ml-2 rounded"
                    onClick={() => moveReferenceDown(index)}
                  >
                    ↓
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 ml-2 rounded"
                    onClick={() =>
                      copyToClipboard(formatReferenceForCopy(reference))
                    }
                  >
                    复制
                  </button>
                  <ParagraphDeleteButton
                    index={index}
                    removeReferenceUpdateIndex={removeReferenceUpdateIndex}
                  ></ParagraphDeleteButton>
                </li>
              )
          )}
      </ul>
    </div>
  );
}

export default ReferenceList;
