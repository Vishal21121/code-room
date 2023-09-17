import React, { useEffect, useRef, useState } from 'react'
import { MdSend } from "react-icons/md";
import ChatMessage from './ChatMessage';
import { useSelector } from 'react-redux';


const ChatBot = () => {
    const [prompt, setPrompt] = useState("")
    const [chat, setChat] = useState([])
    const accessToken = useSelector((state) => state.userData.userData.data.accessToken)
    const chatRef = useRef(null)

    const handleUserSubmit = async () => {
        setChat((prev) => [...prev, { mode: "user", text: prompt }])
        setPrompt("")
        setTimeout(() => {
            chatRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
        await fetchBotResponse()

    }

    const fetchBotResponse = async () => {
        // setChat((prev) => [...prev, { mode: "bot", text: "Please wait a moment while I gather my thoughts and process the information 😊" }])
        try {
            const response = await fetch("http://localhost:8080/api/v1/room-features/chat-bot", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    prompt
                })
            })
            const data = await response.json()
            console.log(data);
            // if (response.data.statusCode === 401 && response.data.message === "jwt expired") { }
            // let chatsExceptLast = [...chat]
            // chatsExceptLast.pop()
            // setChat(() => chatsExceptLast)
            setChat((prev) => [...prev, { mode: "bot", text: data.data.response }])
            setTimeout(() => {
                chatRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
            }, 0);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = async (e) => {
        if (e.code === "Enter") {
            await handleUserSubmit()
        }
    }


    return (
        <div className='bg-[#080b19] w-full h-screen overflow-hidden'>
            <div className='h-[75%] overflow-auto' ref={chatRef}>
                {
                    chat && chat.map((el) => (
                        <ChatMessage mode={el.mode} text={el.text} />
                    ))
                }

            </div>
            <div className='flex justify-center'>
                <div className='absolute bottom-0 flex bg-[#282a36] w-[50%] mx-auto p-2 rounded-lg mb-10 z-10  max-h-[20%] h-[8%] overflow-auto' >
                    <input type="text" className='w-full text-white outline-none bg-[#282a36] rounded-lg mr-2 z-30 resize-none flex items-center' placeholder='Enter your query' onChange={(e) => setPrompt(e.target.value)} value={prompt} onKeyUp={handleSubmit} spellCheck="false" >
                    </input>
                    <MdSend className='text-gray-500 my-auto cursor-pointer mr-4 hover:text-white' size={24} onClick={handleUserSubmit} />
                </div>
            </div>

        </div>

    )
}

export default ChatBot