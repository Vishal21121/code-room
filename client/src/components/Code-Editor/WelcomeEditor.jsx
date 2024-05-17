import React from "react";
import { VscVscode } from "react-icons/vsc";

function WelcomeEditor() {
  return (
    <div className="w-full flex flex-col h-full items-center justify-center">
      <VscVscode className="w-full text-[10rem]" />
      <p className="text-4xl">Welcome</p>
      <div className="flex items-center gap-4 mt-4">
        <p className="text-base">Command Palette</p>
        <p className="text-base">F1</p>
      </div>
    </div>
  );
}

export default WelcomeEditor;
