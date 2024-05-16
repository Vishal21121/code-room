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

  function expandFolder(tree, folderId) {
    if (tree.id === folderId && tree.isFolder) {
      return { ...tree, isExpanded: !tree.isExpanded, isSelected: true };
    } else {
      const newItems = tree.items?.map((el) => expandFolder(el, folderId));
      return { ...tree, isSelected: false, items: newItems };
    }
  }

  function hightlightSelected(tree, elementId) {
    if (tree.id === elementId) {
      return { ...tree, isSelected: true };
    } else {
      const items = tree.items?.map((el) => hightlightSelected(el, elementId));
      return { ...tree, isSelected: false, items };
    }
  }

  function collapseAll(tree) {
    const items =
      tree.items.length > 0 && tree.items.map((el) => collapseAll(el));
    if (tree.isFolder) {
      return { ...tree, isExpanded: false, items };
    } else {
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
  };
};

export default useTraverseTree;
