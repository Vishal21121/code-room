import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { VscFolderOpened, VscFolder, VscFile } from "react-icons/vsc";
import react from "../../../assets/icons/react.svg";
import javascript from "../../../assets/icons/javascript.svg";
import typescript from "../../../assets/icons/typescript.svg";
import html from "../../../assets/icons/html.svg";
import markdown from "../../../assets/icons/markdown.svg";
import css from "../../../assets/icons/css.svg";
import react_ts from "../../../assets/icons/react_ts.svg";
import git from "../../../assets/icons/git.svg";
import nodejs from "../../../assets/icons/nodejs.svg";
import vite from "../../../assets/icons/vite.svg";
import jsMap from "../../../assets/icons/javascript-map.svg";
import eslint from "../../../assets/icons/eslint.svg";
import { fileIconFinder } from "../../../util/fileIconFinder";

function ExplorerRenderer({
  explorer,
  handleInsertNode,
  handleFolderExpand,
  setSelectedId,
  hideInputHandler,
  hightlightSelectedHandlder,
}) {
  const [fileIcon, setFileIcon] = useState();

  const fileMap = {
    react: react,
    javascript: javascript,
    typescript: typescript,
    html: html,
    markdown: markdown,
    css: css,
    react_ts: react_ts,
    git: git,
    nodejs: nodejs,
    vite: vite,
    "javascript-map": jsMap,
    eslint: eslint,
  };

  const onAddNewFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      const tree = handleInsertNode(
        explorer.id,
        e.target.value,
        explorer.inputStat.isFolder
      );
      hideInputHandler(tree, explorer.id);
    }
  };

  const handleFolderClick = (explorer) => {
    handleFolderExpand(explorer.id);
    setSelectedId(explorer.id);
    // hightlightSelectedHandlder(explorer.id);
  };

  useEffect(() => {
    if (!explorer?.isFolder) {
      const icon = fileIconFinder(explorer?.name);
      setFileIcon(fileMap[icon]);
    }
  }, []);

  if (explorer?.isFolder) {
    return (
      <div className="w-full">
        <div
          className={`cursor-pointer mt-1 flex items-center justify-between w-full`}
          onClick={() => handleFolderClick(explorer)}
        >
          <div
            className={`my-0 flex items-center hover:bg-gray-700 w-full ${
              explorer.isSelected ? "bg-gray-700" : ""
            }`}
          >
            {explorer.isExpanded ? (
              <MdOutlineKeyboardArrowDown className="text-xl text-gray-300" />
            ) : (
              <MdOutlineKeyboardArrowRight className="text-xl text-gray-300" />
            )}
            <div className="flex items-center gap-1">
              {explorer.isExpanded ? (
                <VscFolderOpened className="text-gray-300" />
              ) : (
                <VscFolder className="text-gray-300" />
              )}
              <span className="text-gray-300">{explorer?.name}</span>
            </div>
          </div>
        </div>
        <div
          className={`${
            explorer.isExpanded ? "block" : "hidden"
          } pl-4 border-l border-gray-300 text-gray-300`}
        >
          {explorer.inputStat.visible && (
            <div className="flex gap-1 items-center">
              <span className="">
                {explorer.inputStat.isFolder ? <VscFolder /> : <VscFile />}
              </span>
              <input
                className="flex items-center justify-between cursor-pointer bg-gray-700 outline-none text-gray-300 p-1 rounded-md border"
                type="text"
                autoFocus={true}
                onBlur={() => hideInputHandler(explorer.id)}
                onKeyDown={onAddNewFolder}
              />
            </div>
          )}
          {explorer.items.length > 0 &&
            explorer.items.map((el) => (
              <ExplorerRenderer
                explorer={el}
                key={el.id}
                handleInsertNode={handleInsertNode}
                handleFolderExpand={handleFolderExpand}
                setSelectedId={setSelectedId}
                hideInputHandler={hideInputHandler}
                hightlightSelectedHandlder={hightlightSelectedHandlder}
              />
            ))}
        </div>
      </div>
    );
  } else if (explorer && !explorer.isFolder) {
    return (
      <div
        className={`mt-1 pl-8 flex gap-1 items-center text-gray-300 cursor-pointer hover:bg-gray-700 ${
          explorer.isSelected ? "bg-gray-700" : ""
        }`}
        onClick={() => hightlightSelectedHandlder(explorer.id)}
      >
        {fileIcon ? (
          <img src={fileIcon && fileIcon} alt="" className="w-4" />
        ) : (
          <VscFile />
        )}
        <span>{explorer?.name}</span>
      </div>
    );
  }
}

export default ExplorerRenderer;
