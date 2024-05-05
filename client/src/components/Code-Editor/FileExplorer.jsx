import React, { useEffect, useState } from "react";
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from "react-complex-tree";
import "react-complex-tree/lib/style-modern.css";
import { VscFile } from "react-icons/vsc";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import {
  VscNewFile,
  VscNewFolder,
  VscCollapseAll,
  VscFolderOpened,
  VscFolder,
} from "react-icons/vsc";

function FileExplorer() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);

  const items = {
    root: {
      index: "root",
      canMove: true,
      isFolder: true,
      children: ["child1", "child2"],
      data: "Root item",
      canRename: true,
    },
    child1: {
      index: "child1",
      canMove: true,
      isFolder: true,
      children: [""],
      data: "Child item 1",
      canRename: true,
    },
    child2: {
      index: "child2",
      canMove: true,
      isFolder: true,
      children: ["child3"],
      data: "Child item 2",
      canRename: true,
    },
    child3: {
      index: "child3",
      canMove: true,
      isFolder: true,
      children: [],
      data: "child3",
      canRename: true,
    },
  };
  const dataProvider = new StaticTreeDataProvider(items, (item, newName) => ({
    ...item,
    data: newName,
  }));

  const collapseFolder = () => {
    setExpandedItems([]);
  };

  useEffect(() => {
    console.log(expandedItems);
  }, [expandedItems]);

  return (
    <UncontrolledTreeEnvironment
      dataProvider={dataProvider}
      getItemTitle={(item) => item.data}
      viewState={{
        ["tree-2"]: {
          expandedItems: expandedItems,
        },
      }}
      onExpandItem={(item) => {
        console.log(item);
        setExpandedItems([...expandedItems, item.index]);
      }}
      canDragAndDrop={true}
      canDropOnFolder={true}
      canReorderItems={true}
      renderItemTitle={({ title }) => <span>{title}</span>}
      renderItemArrow={({ item, context }) =>
        item.isFolder ? (
          <span {...context.arrowProps}>
            {context.isExpanded ? (
              <MdOutlineKeyboardArrowDown className="text-2xl text-gray-400" />
            ) : (
              <MdOutlineKeyboardArrowRight className="text-2xl text-gray-400" />
            )}
          </span>
        ) : null
      }
      renderTreeContainer={({ children, containerProps }) => (
        <div
          className="p-4 bg-[#282a36] h-full border-r border-gray-500"
          {...containerProps}
        >
          {children}
        </div>
      )}
      renderItemsContainer={({ children, containerProps }) => (
        <ul {...containerProps}>{children}</ul>
      )}
      renderItem={({ context, item, children, arrow }) => {
        return (
          <li
            {...context.itemContainerWithChildrenProps}
            onClick={() => setSelectedItem(item.index)}
          >
            <div
              className={`cursor-pointer ${
                context.isSelected ? "bg-gray-900" : ""
              }`}
              {...context.itemContainerWithoutChildrenProps}
              {...context.interactiveElementProps}
            >
              {item.isFolder ? (
                <div className="flex items-center gap-1">
                  {arrow}
                  {context.isExpanded ? (
                    <VscFolderOpened className="text-gray-400" />
                  ) : (
                    <VscFolder className="text-gray-400" />
                  )}
                  <span className="text-gray-400">{item.data}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <VscFile className="text-gray-400" />
                  <span>{item.data}</span>
                </div>
              )}
            </div>

            <div className="pl-4 pt-1">{children}</div>
          </li>
        );
      }}
    >
      <div className="flex justify-end gap-2 bg-[#161a2a] border-r border-gray-500 p-1">
        <button>
          <VscNewFile className="text-xl text-gray-400 hover:text-gray-300" />
        </button>
        <button>
          <VscNewFolder className="text-xl text-gray-400 hover:text-gray-300" />
        </button>
        <button onClick={collapseFolder}>
          <VscCollapseAll className="text-xl text-gray-400 hover:text-gray-300" />
        </button>
      </div>
      <Tree treeId="tree-2" rootItem="root" treeLabel="Tree Example" />
    </UncontrolledTreeEnvironment>
  );
}

export default FileExplorer;
