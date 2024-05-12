import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Terminal from "./Terminal";
import CodeEditor from "./CodeEditor";
import FileExplorer from "./FileExplorer/FileExplorer";
import { useResizable } from "react-resizable-layout";
import { classAdder } from "../../util/classAdder";
import Splitter from "./Splitter";

const IDE = () => {
  const [output, setOutput] = useState("");
  const {
    isDragging: isTerminalDragging,
    position: terminalHorizontal,
    separatorProps: terminalDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 230,
    min: 0,
    reverse: true,
  });
  const {
    isDragging: isFileDragging,
    position: fileWidth,
    separatorProps: fileDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 300,
    min: 200,
    max: 500,
  });
  const {
    isDragging: isDisplayDragging,
    position: displayWidth,
    separatorProps: widthDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 300,
    min: 200,
    reverse: true,
    // max: 600,
  });

  const handleSubmit = async (code, language, version) => {
    console.log({ language, version });
    if (!code) {
      return;
    }
    // e.preventDefault()
    document.getElementById("terminal").classList.remove("invisible");
    document.getElementById("termEl").click();
    let data;
    const toastId = toast.loading("Compiling code...");
    try {
      const result = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: language,
          version: version,
          files: [{ content: code }],
        }),
      });
      data = await result.json();
    } catch (error) {
      console.error(error);
    }
    console.log("code compiled: ", data);
    if (data.run.stdout) {
      setOutput(data.run.stdout);
      toast.success("Code compiled successfully", {
        id: toastId,
      });
    } else if (data.run.stderr) {
      setOutput(data.run.stderr);
      toast.error("error in the code", {
        id: toastId,
      });
    } else {
      toast.success("Code compiled", {
        id: toastId,
      });
      setOutput("Nothing to print");
    }
  };

  const toggleTerminal = (event) => {
    let classList = document.getElementById("terminal").classList;
    if (event.altKey && event.key == "o") {
      console.log("invisible");
      if (classList.contains("invisible")) {
        classList.remove("invisible");
      } else {
        classList.add("invisible");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", toggleTerminal);
    return () => {
      document.removeEventListener("keydown", toggleTerminal);
    };
  }, []);

  return (
    <>
      <div className="flex grow w-full h-screen overflow-hidden ">
        <FileExplorer isFileDragging={isFileDragging} fileWidth={fileWidth} />
        <Splitter isDragging={isFileDragging} {...fileDragBarProps} />
        <div className="flex flex-col justify-center h-full w-full">
          <div className="flex grow h-[60%]">
            <CodeEditor handleSubmit={handleSubmit} />
            <div className="bg-red-500 shrink-0 w-1/2">Display</div>
          </div>
          <Splitter
            dir={"horizontal"}
            isDragging={isTerminalDragging}
            {...terminalDragBarProps}
          />
          <Terminal
            output={output}
            isTerminalDragging={isTerminalDragging}
            terminalHorizontal={terminalHorizontal}
          />
        </div>
      </div>

      {/* <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex-grow">
          <div className="bg-[#3A424D] flex-grow">
          </div>
          
        </div>
        
      </div> */}
    </>
  );
};

export default IDE;
