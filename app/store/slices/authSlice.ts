import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reference } from "@/utils/global";
export interface APIState {
  apiKey: string;
  referencesRedux: Reference[];
  editorContent: string;
  upsreamUrl: string;
  systemPrompt: string;
}

const initialState: APIState = {
  apiKey: "sess-L6DwIB7N859iQLWfNBTaPsmkErqZrjoXVk6m7BmA",
  referencesRedux: [],
  editorContent: "",
  upsreamUrl: "https://api.liuweiqing.top", //https://api.openai.com  https://one.caifree.com https://chatserver.3211000.xyz
  systemPrompt: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setApiKey: (state, action: PayloadAction<string>) => {
      state.apiKey = action.payload;
    },
    setUpsreamUrl: (state, action: PayloadAction<string>) => {
      state.upsreamUrl = action.payload;
    },
    setSystemPrompt: (state, action: PayloadAction<string>) => {
      state.systemPrompt = action.payload;
    },
    setEditorContent: (state, action: PayloadAction<string>) => {
      state.editorContent = action.payload;
    },
    addReferenceRedux: (state, action: PayloadAction<Reference>) => {
      state.referencesRedux.push(action.payload);
    },
    addReferencesRedux: (
      state,
      action: PayloadAction<{ references: Reference[]; position?: number }>
    ) => {
      const { references, position } = action.payload;
      const insertPosition =
        position !== undefined ? position : state.referencesRedux.length;
      state.referencesRedux.splice(insertPosition, 0, ...references);
    },
    removeReferenceRedux: (state, action: PayloadAction<number>) => {
      state.referencesRedux = state.referencesRedux.filter(
        (_, i) => i !== action.payload
      );
    },
    clearReferencesRedux: (state) => {
      state.referencesRedux = [];
    },
    swapReferencesRedux: (
      state,
      action: PayloadAction<{ indexA: number; indexB: number }>
    ) => {
      console.log("moveReference", state.referencesRedux); // 调试输出

      const { indexA, indexB } = action.payload;
      if (
        indexA >= 0 &&
        indexA < state.referencesRedux.length &&
        indexB >= 0 &&
        indexB < state.referencesRedux.length
      ) {
        const newReferences = [...state.referencesRedux];
        const temp = newReferences[indexA];
        newReferences[indexA] = newReferences[indexB];
        newReferences[indexB] = temp;
        state.referencesRedux = newReferences;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setApiKey,
  setUpsreamUrl,
  addReferenceRedux,
  addReferencesRedux,
  removeReferenceRedux,
  clearReferencesRedux,
  setEditorContent,
  setSystemPrompt,
  swapReferencesRedux,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
