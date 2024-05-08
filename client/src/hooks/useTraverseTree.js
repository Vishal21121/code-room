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

  function showInputHandler(tree, folderId) {
    if (tree.id === folderId && tree.isFolder) {
      tree.isInputVisible = true;
      tree.isExpanded = true;
      return tree;
    }
    const newItem = tree.items?.map((el) => showInputHandler(el, folderId));
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

  return { insertNode, showInputHandler, expandFolder };
};

export default useTraverseTree;
