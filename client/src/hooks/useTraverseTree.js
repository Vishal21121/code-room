import { v4 as uuidv4 } from "uuid";

const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      const newItem = {
        id: uuidv4(),
        name: item,
        isFolder,
        inputStat: {
          visible: false,
          isFolder: null,
        },
        isExpanded: false,
        items: [],
      };
      const newItems = [...tree.items, newItem];
      let finalTree = { ...tree, items: newItems };
      return finalTree;
    }
    const latestNode = tree.items.map((el) =>
      insertNode(el, folderId, item, isFolder)
    );
    return { ...tree, items: latestNode };
  }

  function showInput(tree, folderId, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      return {
        ...tree,
        inputStat: { visible: true, isFolder: isFolder },
        isExpanded: tree.isExpanded === false ? true : true,
      };
    }
    const newItem = tree.items?.map((el) => showInput(el, folderId, isFolder));
    return { ...tree, items: newItem };
  }

  function hideInput(tree, folderId) {
    if (tree.id === folderId && tree.isFolder) {
      return {
        ...tree,
        inputStat: { ...tree.inputStat, visible: false },
      };
    }
    const newItem = tree.items?.map((el) => hideInput(el, folderId));
    return { ...tree, items: newItem };
  }

  function expandFolder(tree, folderId, path = []) {
    if (tree.id === folderId && tree.isFolder) {
      return {
        tree: {
          ...tree,
          isExpanded: !tree.isExpanded,
          isSelected: true,
        },
        path: [...path],
      };
    } else {
      const newItems = tree.items?.map((el) =>
        expandFolder(el, folderId, [...path, el.name])
      );
      let pathResults = newItems && newItems.map((item) => item.path);
      let finalPath =
        pathResults.length > 0 ? pathResults.find((el) => el?.length > 0) : [];
      return {
        tree: {
          ...tree,
          isSelected: false,
          items: newItems.map((item) => item.tree),
        },
        path: finalPath,
      };
    }
  }

  function hightlightSelected(tree, elementId, path = [], fileName = "") {
    if (tree.id === elementId && !tree.isFolder) {
      return {
        tree: { ...tree, isSelected: true },
        path: [...path],
        filename: fileName,
      };
    } else {
      const newItems = tree.items?.map((el) =>
        hightlightSelected(el, elementId, [...path, el.name], el.name)
      );
      let ansElement =
        newItems.length > 0 &&
        newItems?.find((el) => el?.path?.length > path.length);
      let finalPath, fileName;
      if (!ansElement) {
        finalPath = [];
        fileName = "";
      } else {
        fileName = ansElement.filename;
        finalPath = ansElement.path;
      }
      return {
        tree: {
          ...tree,
          isSelected: false,
          items: newItems.map((item) => item.tree),
        },
        path: finalPath,
        filename: fileName,
      };
    }
  }

  function collapseAll(tree) {
    const items = tree.items?.map((el) => collapseAll(el));
    if (tree.isFolder) {
      return { ...tree, isExpanded: false, items };
    } else {
      return { ...tree, items };
    }
  }

  function renderFolderContent(tree, elementId, folderItems) {
    if (tree.id === elementId && tree.isFolder) {
      console.log("entered", folderItems);
      return { ...tree, items: folderItems };
    } else {
      const items = tree.items?.map((el) =>
        renderFolderContent(el, elementId, folderItems)
      );
      return { ...tree, items };
    }
  }

  return {
    insertNode,
    showInput,
    hideInput,
    expandFolder,
    hightlightSelected,
    collapseAll,
    renderFolderContent,
  };
};

export default useTraverseTree;
