import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import {
  VscNewFile,
  VscNewFolder,
  VscCollapseAll,
  VscFolderOpened,
  VscFolder,
} from "react-icons/vsc";

function ExplorerRenderer({ explorer, handleInsertNode }) {
  const [expand, setExpand] = useState(false);
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
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleFolderClick = (explorer) => {
    setSelected(explorer.name);
    setExpand(!expand);
    console.log(explorer.name);
  };

  if (explorer?.isFolder) {
    return (
      <div className="p-1">
        <div
          className={`cursor-pointer mt-1 bg-gray-300 flex items-center justify-between p-1 w-80`}
          onClick={() => handleFolderClick(explorer)}
        >
          <div className="my-0 mx-1 flex items-center">
            {expand ? (
              <MdOutlineKeyboardArrowDown className="text-xl" />
            ) : (
              <MdOutlineKeyboardArrowRight className="text-xl" />
            )}
            📁{explorer?.name}
          </div>
          <div className="flex gap-2">
            <button>
              <VscNewFile
                className="text-xl"
                onClick={(e) => handleNewFolder(e, false)}
              />
            </button>
            <button>
              <VscNewFolder
                className="text-xl"
                onClick={(e) => handleNewFolder(e, true)}
              />
            </button>
          </div>
        </div>
        <div
          className={`${
            expand ? "block" : "hidden"
          } pl-4 border-l-2 border-gray-300`}
        >
          {showInput.visible && (
            <div className="flex gap-1 items-center">
              <span className="mt-1">{showInput.isFolder ? "📁" : "📃"}</span>
              <input
                className="p-1 mt-2 flex border border-gray-300 items-center justify-between cursor-pointer"
                type="text"
                autoFocus={true}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={onAddNewFolder}
              />
            </div>
          )}
          {explorer.items.map((el) => (
            <ExplorerRenderer
              explorer={el}
              key={el.id}
              handleInsertNode={handleInsertNode}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <span className="mt-1 pl-8 flex flex-col text-gray-300">
        📃{explorer?.name}
      </span>
    );
  }
}

export default ExplorerRenderer;
