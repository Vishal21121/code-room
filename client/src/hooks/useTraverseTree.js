import { v4 as uuidv4 } from "uuid";

const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.push({
        id: uuidv4(),
        name: item,
        isFolder,
        inputStat: {
          visible: false,
          isFolder: null,
        },
        isExpanded: false,
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((el) =>
      insertNode(el, folderId, item, isFolder)
    );
    return { ...tree, items: latestNode };
  }

  function showInput(tree, folderId, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      // console.log("showInput", folderId, isFolder);
      // console.log(tree.inputStat);
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
    console.log(folderId);
    if (tree.id === folderId && tree.isFolder) {
      console.log("hideInput", tree.inputStat.visible);
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
      tree.isSelected = false;
      const newItems =
        tree.items.length > 0 &&
        tree.items.map((el) => expandFolder(el, folderId));
      return { ...tree, items: newItems };
    }
  }

  function hightlightSelected(tree, elementId) {
    if (tree.id === elementId) {
      return { ...tree, isSelected: true };
    } else {
      tree.isSelected = false;
      const items =
        tree.items.length > 0 &&
        tree.items.map((el) => hightlightSelected(el, elementId));
      return { ...tree, items };
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
