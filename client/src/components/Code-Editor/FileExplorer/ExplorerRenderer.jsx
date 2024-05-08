import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { VscFolderOpened, VscFolder, VscFile } from "react-icons/vsc";

function ExplorerRenderer({
  explorer,
  handleInsertNode,
  handleFolderExpand,
  setSelectedId,
  hideInputHandler,
  hightlightSelectedHandlder,
}) {
  // const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [selected, setSelected] = useState(null);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    if (isFolder) {
      setShowInput({
        visible: true,
        isFolder: true,
      });
    } else {
      setShowInput({
        visible: true,
        isFolder: false,
      });
    }
  };

  const onAddNewFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // add logic
      handleInsertNode(
        explorer.id,
        e.target.value,
        explorer.inputStat.isFolder
      );
      hideInputHandler(explorer.id);
    }
  };

  const handleFolderClick = (explorer) => {
    handleFolderExpand(explorer.id);
    setSelectedId(explorer.id);
    // hightlightSelectedHandlder(explorer.id);
  };

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
                className="flex items-center justify-between cursor-pointer bg-gray-700 outline-none text-gray-300 p-1 rounded-md"
                type="text"
                autoFocus={true}
                onBlur={() => hideInputHandler(explorer.id)}
                onKeyDown={onAddNewFolder}
              />
            </div>
          )}
          {explorer.items.map((el) => (
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
  } else {
    return (
      <span
        className={`mt-1 pl-8 flex flex-col text-gray-300 cursor-pointer hover:bg-gray-700 ${
          explorer.isSelected ? "bg-gray-700" : ""
        }`}
        onClick={() => hightlightSelectedHandlder(explorer.id)}
      >
        📃{explorer?.name}
      </span>
    );
  }
}

export default ExplorerRenderer;
