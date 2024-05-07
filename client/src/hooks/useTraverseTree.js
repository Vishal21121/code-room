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
    tree.items?.map((el) => showInputHandler(el, folderId));
    return tree;
  }

  function expandFolder(tree, folderId) {
    if (tree.id === folderId && tree.isFolder) {
      tree.isExpanded = !tree.isExpanded;
      console.log("got", tree.isExpanded);
      return tree;
    }
    tree.items?.map((el) => expandFolder(el, folderId));
    return tree;
  }

  return { insertNode, showInputHandler, expandFolder };
};

export default useTraverseTree;
