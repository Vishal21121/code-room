import React from 'react'
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import 'react-complex-tree/lib/style-modern.css';
import { VscFolder } from "react-icons/vsc";
import { VscFile } from "react-icons/vsc";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";

function FileExplorer() {
    const items = {
        root: {
            index: 'root',
            canMove: true,
            isFolder: true,
            children: ['child1', 'child2'],
            data: 'Root item',
            canRename: true,
        },
        child1: {
            index: 'child1',
            canMove: true,
            isFolder: true,
            children: [""],
            data: 'Child item 1',
            canRename: true,
        },
        child2: {
            index: 'child2',
            canMove: true,
            isFolder: true,
            children: ["child3"],
            data: 'Child item 2',
            canRename: true,
        },
        child3: {
            index: 'child3',
            canMove: true,
            isFolder: true,
            children: [],
            data: "child3",
            canRename: true,
        }
    };
    const dataProvider = new StaticTreeDataProvider(items, (item, newName) => ({ ...item, data: newName }));
    return (
        <UncontrolledTreeEnvironment
            dataProvider={dataProvider}
            getItemTitle={item => item.data}
            viewState={{}}
            canDragAndDrop={true}
            canDropOnFolder={true}
            canReorderItems={true}

            renderItemTitle={({ title }) => <span>{title}</span>}
            renderItemArrow={({ item, context }) => (
                item.isFolder ? (
                    <span {...context.arrowProps}>
                        {context.isExpanded ? <MdOutlineKeyboardArrowDown className='text-2xl text-gray-400' /> : <MdOutlineKeyboardArrowRight className='text-2xl text-gray-400'/>}
                    </span>
                ) : null
            )}
            renderTreeContainer={({ children, containerProps }) => <div className='p-4 bg-[#282a36] h-full border-r border-gray-500' {...containerProps}>{children}</div>}
            renderItemsContainer={({ children, containerProps }) => <ul {...containerProps}>{children}</ul>}
            renderItem={({context,item,children,arrow})=>( 
                <li
                    style={{
                        margin:0,
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"flex-start"
                    }}
                    {...context.itemContainerWithChildrenProps}
                >
                    <div
                        className='cursor-pointer'
                        {...context.itemContainerWithoutChildrenProps}
                        {...context.interactiveElementProps}
                    >
                        {
                            item.isFolder ? (
                            <div className='flex items-center gap-1'>
                                {
                                    arrow
                                }
                                <VscFolder  className='text-gray-400'/> 
                                <span className='text-gray-400'>{item.data}</span>
                                </div>) : <div className='flex items-center gap-1'><VscFile className='text-gray-400' /><span>{item.data}</span></div>
                        }
                    </div>
                    <div className='pl-4 pt-1'>
                        {children}
                    </div>
                </li>
             )}
            
            
        >
            <Tree treeId="tree-2" rootItem="root" treeLabel="Tree Example" />
        </UncontrolledTreeEnvironment>
    );
}

export default FileExplorer