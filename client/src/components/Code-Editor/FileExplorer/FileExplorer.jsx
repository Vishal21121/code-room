import React, { useEffect, useState } from "react";
import explorer from "../../../util/folderData.js";
import ExplorerRenderer from "./ExplorerRenderer";
import useTraverseTree from "../../../hooks/useTraverseTree.js";
import { VscCollapseAll, VscNewFile, VscNewFolder } from "react-icons/vsc";
import { classAdder } from "../../../util/classAdder.js";

function FileExplorer({ isFileDragging, fileWidth }) {
  const [explorerData, setExplorerData] = useState(explorer);
  const [selectedId, setSelectedId] = useState(null);
  const {
    insertNode,
    expandFolder,
    showInput,
    hideInput,
    hightlightSelected,
    collapseAll,
  } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleInputInsertion = (isFolder) => {
    const tree = showInput(explorerData, selectedId, isFolder);
    setExplorerData(tree);
  };

  const handleFolderExpand = (folderId) => {
    const tree = expandFolder(explorerData, folderId);
    console.log("folder", tree);
    setExplorerData(tree);
  };

  const hideInputHandler = (folderId) => {
    console.log("hideInputHandler called");
    const tree = hideInput(explorerData, folderId);
    console.log(tree);
    setExplorerData(tree);
  };

  const hightlightSelectedHandlder = (elementId) => {
    const tree = hightlightSelected(explorerData, elementId);
    console.log("highlighter", tree);
    setExplorerData(tree);
  };

  const handleCollapseAll = () => {
    const tree = collapseAll(explorerData);
    setExplorerData(tree);
  };

  return (
    <div
      className={classAdder(
        "bg-[#282a36] h-screen shrink-0",
        isFileDragging && "dragging"
      )}
      style={{ width: fileWidth }}
    >
      <div className="bg-[#161a2a] flex p-2 items-center justify-between h-12">
        <p className="text-md text-gray-300">File explorer</p>
        <div className="flex gap-2">
          <div className="tooltip tooltip-bottom" data-tip="New File...">
            <VscNewFile
              className="text-xl text-gray-300 cursor-pointer"
              onClick={() => handleInputInsertion(false)}
            />
          </div>
          <div className="tooltip tooltip-bottom" data-tip="New Folder...">
            <VscNewFolder
              className="text-xl text-gray-300 cursor-pointer"
              onClick={() => handleInputInsertion(true)}
            />
          </div>
          <div
            className="tooltip tooltip-bottom"
            data-tip="Collapse Folders in Explorer"
          >
            <VscCollapseAll
              className="text-xl text-gray-300 cursor-pointer"
              onClick={handleCollapseAll}
            />
          </div>
        </div>
      </div>
      <ExplorerRenderer
        explorer={explorerData}
        handleInsertNode={handleInsertNode}
        handleFolderExpand={handleFolderExpand}
        setSelectedId={setSelectedId}
        hideInputHandler={hideInputHandler}
        hightlightSelectedHandlder={hightlightSelectedHandlder}
      />
    </div>
  );
}

export default FileExplorer;
