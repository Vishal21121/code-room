import React, { useEffect, useState } from "react";
import ExplorerRenderer from "./ExplorerRenderer";
import useTraverseTree from "../../../hooks/useTraverseTree.js";
import { VscCollapseAll, VscNewFile, VscNewFolder } from "react-icons/vsc";
import { classAdder } from "../../../util/classAdder.js";
import { useDispatch, useSelector } from "react-redux";
import { setFileData } from "../../../features/editor/fileExplorerSlice.js";
import { useLazyGetFilesQuery } from "../../../features/editor/editorApiSlice.js";
import { languageFind } from "../../../util/fileIconFinder.js";
import { setOpenFiles } from "../../../features/editor/editorSlice.js";

function FileExplorer({ isFileDragging, fileWidth }) {
  const explorerData = useSelector((state) => state.fileExplorer.fileData);
  const room = useSelector((state) => state.room.room);
  const [getFiles] = useLazyGetFilesQuery();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const {
    insertNode,
    expandFolder,
    showInput,
    hideInput,
    hightlightSelected,
    collapseAll,
    renderFolderContent,
  } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    dispatch(setFileData(finalTree));
    return finalTree;
  };

  const handleInputInsertion = (isFolder) => {
    const tree = showInput(explorerData, selectedId, isFolder);
    dispatch(setFileData(tree));
  };

  const handleFolderExpand = async (folderId) => {
    const { tree, path } = expandFolder(explorerData, folderId);
    dispatch(setFileData(tree));
    let pathJoined = path.join("/");

    // TODO: getFile is getting called everytime so optimisations are to be added:
    // 1. call only when we want to expand the folder
    try {
      const response = await getFiles({
        roomName: room.name,
        path: pathJoined,
        isFolder: true,
      }).unwrap();
      let folderContent = response.data.value;
      const renderedTree = renderFolderContent(tree, folderId, folderContent);
      console.log(renderedTree);
      dispatch(setFileData(renderedTree));
    } catch (error) {
      console.log(error);
    }
  };

  const hideInputHandler = (explorerData, folderId) => {
    const tree = hideInput(explorerData, folderId);
    dispatch(setFileData(tree));
  };

  const hightlightSelectedHandlder = async (elementId) => {
    const { tree, filename, path } = hightlightSelected(
      explorerData,
      elementId
    );
    dispatch(setFileData(tree));
    console.log("hightlightSelected", filename, path);
    let pathJoined = path.join("/");
    try {
      const response = await getFiles({
        roomName: room.name,
        path: pathJoined,
        isFolder: false,
      }).unwrap();
      const data = response.data.value;
      console.log("fileContent", data);
      const language = languageFind(filename.split(".")[1]);
      const fileObject = {
        filename,
        language,
        code: data,
      };
      dispatch(setOpenFiles(fileObject));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCollapseAll = () => {
    const tree = collapseAll(explorerData);
    dispatch(setFileData(tree));
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
      <div className="h-[92vh] overflow-auto">
        <ExplorerRenderer
          explorer={explorerData}
          handleInsertNode={handleInsertNode}
          handleFolderExpand={handleFolderExpand}
          setSelectedId={setSelectedId}
          hideInputHandler={hideInputHandler}
          hightlightSelectedHandlder={hightlightSelectedHandlder}
        />
      </div>
    </div>
  );
}

export default FileExplorer;
