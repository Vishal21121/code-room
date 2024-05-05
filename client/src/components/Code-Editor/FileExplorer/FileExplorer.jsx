import React, { useEffect, useState } from "react";
import explorer from "../../../util/folderData.js";
import ExplorerRenderer from "./ExplorerRenderer";
import useTraverseTree from "../../../hooks/useTraverseTree.js";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";

function FileExplorer() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <div className="bg-[#282a36] h-screen border-r boder-gray-300">
      <div className="flex gap-2 justify-end bg-[#161a2a] p-2">
        <VscNewFile className="text-xl text-gray-300" />
        <VscNewFolder className="text-xl text-gray-300" />
      </div>
      <ExplorerRenderer
        explorer={explorerData}
        handleInsertNode={handleInsertNode}
      />
    </div>
  );
}

export default FileExplorer;
