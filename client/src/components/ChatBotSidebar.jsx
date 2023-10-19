import React from 'react'
import { RxPlus } from "react-icons/rx";
import SidebarMessage from './SidebarMessage';

const ChatBotSidebar = () => {
    return (
        <div className='w-[20%] bg-gray-950 p-2 flex flex-col items-center gap-8'>
            <div className='border w-[90%] p-2 rounded-md  ring-2 ring-gray-400 mt-2 text-left flex gap-2 items-center cursor-pointer hover:ring-white'>
                <RxPlus size={20} className='text-gray-400' />
                <p className='text-gray-300'>New Chat</p>
            </div>
            <div className='w-full h-full flex flex-col gap-4 items-center'>
                <SidebarMessage />
            </div>
        </div>
    )
}

export default ChatBotSidebar