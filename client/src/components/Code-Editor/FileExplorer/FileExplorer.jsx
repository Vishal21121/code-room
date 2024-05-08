import React, { useEffect, useState } from "react";
import explorer from "../../../util/folderData.js";
import ExplorerRenderer from "./ExplorerRenderer";
import useTraverseTree from "../../../hooks/useTraverseTree.js";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";

function FileExplorer() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, expandFolder } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleFolderExpand = (folderId) => {
    const tree = expandFolder(explorerData, folderId);
    console.log("folder", tree);
    setExplorerData(tree);
  };

  return (
    <div className="bg-[#282a36] h-screen border-r boder-gray-300">
      <div className="bg-[#161a2a] flex p-2 items-center justify-between">
        <p className="text-md text-gray-300">File explorer</p>
        <div className="flex gap-2">
          <VscNewFile className="text-xl text-gray-300" />
          <VscNewFolder className="text-xl text-gray-300" />
        </div>
      </div>
      <ExplorerRenderer
        explorer={explorerData}
        handleInsertNode={handleInsertNode}
        handleFolderExpand={handleFolderExpand}
      />
    </div>
  );
}

export default FileExplorer;
