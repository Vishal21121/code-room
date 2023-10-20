import React from 'react'
import { PiChatBold } from "react-icons/pi";

const SidebarMessage = () => {
    return (
        <div className='w-[95%] ring-2 ring-gray-300 hover:ring-white p-4 rounded-lg bg-gray-900 flex gap-2 cursor-pointer items-center'>
            <PiChatBold size={20} className='text-gray-300' />
            <p className='w-full whitespace-nowrap overflow-hidden text-ellipsis text-gray-300'>write a program to add two numbers in java</p>
        </div>
    )
}

export default SidebarMessage