import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import QuillWrapper from "./QuillWrapper";
// import TinyEditor from "../components/TinyEditor";
// import SEditor from "../components/SlateEditor";
import SettingsLink from "@/components/SettingsLink";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
// import React, { useState, useEffect, useRef } from "react";

// import Error from "@/app/global-error";
export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          {isSupabaseConnected && <AuthButton />}
          <SettingsLink />
        </div>
      </nav>
      {/* <ErrorBoundary fallback={<Error />}> */}
      <QuillWrapper />
      {/* </ErrorBoundary> */}

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          <a
            href="https://github.com/14790897/paper-ai"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            give me a star in GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

{
  /* <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </main>
      </div> */
}
{
  /* <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3"> */
}
{
  /*</div> */
}
