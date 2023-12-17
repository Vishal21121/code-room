import React, { useState } from 'react'
import { PiChatBold } from "react-icons/pi";
import { useLazyGetChatsQuery } from '../../features/chat-bot/botApiSlice';
import { setChats } from '../../features/chat-bot/botSlice';
import { useDispatch } from 'react-redux';

const SidebarMessage = ({ name, id, index, handleDivSelect }) => {
    const [getChats] = useLazyGetChatsQuery()
    const dispatch = useDispatch()

    const handleClick = async (e, id) => {
        const data = {
            containerId: id
        }
        e.preventDefault()
        try {
            const response = await getChats(data).unwrap()
            dispatch(setChats(response.data.value))
            dispatch(setChatContainer(id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`w-[95%] ring-2 ring-gray-300 hover:ring-white p-4 rounded-lg  flex gap-2 cursor-pointer items-center ${index === id ? "bg-gray-600" : ""}`} id={id} onClick={(e) => { handleDivSelect(e.currentTarget.id); handleClick(e, id) }}>
            <PiChatBold size={20} className='text-gray-300' />
            <p className='w-full whitespace-nowrap overflow-hidden text-ellipsis text-gray-300 focus:bg-gray-500'>{name}</p>
        </div>
    )
}

export default SidebarMessage