import React, { useEffect, useState } from 'react'
import { RxPlus } from "react-icons/rx";
import SidebarMessage from './SidebarMessage';
import { useLazyGetChatContainerQuery } from '../features/chat-bot/botApiSlice';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatBotSidebar = () => {
    const id = useSelector(state => state.bot.chatContainer)
    const { roomId } = useParams()
    const [chatContainers, setChatContainers] = useState([])
    const [getChatContainer] = useLazyGetChatContainerQuery()
    const fetchChatContainer = async () => {
        let data = { roomId }
        try {
            const response = await getChatContainer(data).unwrap()
            console.log("Got chat container: ", response.data.value);
            setChatContainers(response.data.value)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchChatContainer()
    }, [id])
    return (
        <div className='w-[20%] bg-gray-950 p-2 flex flex-col items-center gap-8'>
            <div className='border w-[90%] p-2 rounded-md  ring-2 ring-gray-400 mt-2 text-left flex gap-2 items-center cursor-pointer hover:ring-white'>
                <RxPlus size={20} className='text-gray-400' />
                <p className='text-gray-300'>New Chat</p>
            </div>
            <div className='w-full h-full flex flex-col gap-4 items-center overflow-auto py-2'>
                {
                    chatContainers && chatContainers.map((el) => (
                        <SidebarMessage name={el.name} />
                    ))
                }
            </div>
        </div>
    )
}

export default ChatBotSidebar