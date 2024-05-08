const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
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
    console.log("got", tree, "folder Id", folderId);
    if (tree.id === folderId && tree.isFolder) {
      return { ...tree, isExpanded: !tree.isExpanded };
    }
    const newItems = tree.items.map((el) => expandFolder(el, folderId));
    console.log(newItems);
    return { ...tree, items: newItems };
  }

  return { insertNode, showInput, hideInput, expandFolder };
};

export default useTraverseTree;
