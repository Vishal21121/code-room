import React from 'react'
import ChatBotSidebar from './ChatBotSidebar';
import ChatBotMainComponent from './ChatBotMainComponent';


const ChatBot = () => {


    return (
        <div className='bg-[#080b19] flex w-full h-screen'>
            <ChatBotSidebar />
            <ChatBotMainComponent />
        </div>

    )
}

export default ChatBot