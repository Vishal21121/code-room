import React, { useEffect, useRef, useState } from 'react'
import { MdSend } from "react-icons/md";
import ChatMessage from './ChatMessage';
import { useSelector } from 'react-redux';


const ChatBot = () => {
    const [prompt, setPrompt] = useState("")
    const [chat, setChat] = useState([])
    const accessToken = useSelector((state) => state.userData.userData.data.accessToken)
    const chatRef = useRef(null)
    const textAreaRef = useRef(null);

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
        if (e.key === 'Enter' && e.shiftKey) {
            // Shift + Enter was pressed, insert newline
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            e.target.value = e.target.value.substring(0, start) + "\n" + e.target.value.substring(end);
            // Move the cursor after the newline
            e.target.selectionStart = e.target.selectionEnd = start + 1;
        } else if (e.key === 'Enter') {
            e.preventDefault();
            await handleUserSubmit()
        }
    }

    const handleChange = async (e) => {
        setPrompt(e.target.value)
        textAreaRef.current.style.height = 'auto';
        // Change the height of the textarea based on scrollHeight
        // But limit it to a maximum of 300px
        textAreaRef.current.style.height = Math.min(textAreaRef.current.scrollHeight, 200) + 'px';
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
            <div className='flex justify-center max-h-[20%]'>
                <div className='absolute bottom-0 flex bg-[#282a36] w-1/2 mx-auto p-2 rounded-lg mb-10 z-10 max-h-96 overflow-hidden border'>
                    <textarea ref={textAreaRef} type="text" className='box-border w-11/12 h-10 text-white outline-none bg-[#282a36] rounded-lg mr-2 z-30 resize-none p-2 overflow-auto' placeholder='Enter your query' onChange={(e) => handleChange(e)} value={prompt} onKeyUp={handleSubmit} spellCheck="false" >
                    </textarea>
                    <MdSend className='text-gray-500 my-auto cursor-pointer mr-4 hover:text-white' size={24} onClick={handleUserSubmit} />
                </div>
            </div>

        </div>

    )
}

export default ChatBot