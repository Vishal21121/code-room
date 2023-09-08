import React from 'react'
import { MdSend } from "react-icons/md";
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';


const ChatBot = () => {

    return (
        <div className='bg-[#080b19] w-full h-screen'>
            <div className='h-[84%] overflow-auto'>
                {/* user */}
                <UserMessage />
                <BotMessage />
                <UserMessage />
                <BotMessage />
                <UserMessage />
                <BotMessage />
                <UserMessage />
                <BotMessage />

            </div>
            <div className='fixed bottom-0 left-[25%] flex bg-[#282a36] w-[50%] mx-auto p-2 rounded-lg mb-10 z-10'>
                <input type="text" className='w-full text-white outline-none p-2 bg-[#282a36] rounded-lg mr-2 z-30' placeholder='Enter your query' />
                <MdSend className='text-gray-500 my-auto cursor-pointer mr-4 hover:text-white' size={24} />
            </div>
        </div>

    )
}

export default ChatBot