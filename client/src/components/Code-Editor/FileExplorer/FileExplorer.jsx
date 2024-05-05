import React, { useEffect, useState } from "react";
import explorer from "../../../util/folderData.js";
import ExplorerRenderer from "./ExplorerRenderer";
import useTraverseTree from "../../../hooks/useTraverseTree.js";

function FileExplorer() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <ExplorerRenderer
      explorer={explorerData}
      handleInsertNode={handleInsertNode}
    />
  );
}

export default FileExplorer;
