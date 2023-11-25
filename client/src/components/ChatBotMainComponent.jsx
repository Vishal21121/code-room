import React, { useRef, useState } from 'react'
import { MdSend } from "react-icons/md";
import ChatMessage from './ChatMessage';
import { useSelector } from 'react-redux';
import { useAskBotMutation } from '../features/chat-bot/botApiSlice';


const ChatBotMainComponent = () => {
    const chatRef = useRef(null)
    const textAreaRef = useRef(null);
    const [askBot] = useAskBotMutation()
    const [prompt, setPrompt] = useState("")
    const [chat, setChat] = useState([])
    const accessToken = useSelector((state) => state.userData.userData.data.accessToken)


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
        const body = {
            prompt
        }
        try {
            const response = await askBot(body).unwrap()
            // console.log(data);
            // if (response.data.statusCode === 401 && response.data.message === "jwt expired") { }
            // let chatsExceptLast = [...chat]
            // chatsExceptLast.pop()
            // setChat(() => chatsExceptLast)
            console.log("response Bot", response);
            setChat((prev) => [...prev, { mode: "bot", text: response.data.response }])
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

    const handleKeyUp = async (e) => {
        e.target.style.height = '2.5rem'
        let height = e.target.scrollHeight
        e.target.style.height = `${height}px`
    }

    const handleChange = (e) => {
        setPrompt(e.target.value)
    }



    return (
        <div className='h-full flex flex-col items-center w-[80%]'>
            <div className='h-[80%] overflow-auto w-full' ref={chatRef}>
                {
                    chat && chat.map((el) => (
                        <ChatMessage mode={el.mode} text={el.text} />
                    ))
                }

            </div>
            <div className='absolute bottom-0 flex items-center bg-[#282a36] w-1/2 mx-auto p-2 rounded-lg mb-10 z-10'>
                <textarea ref={textAreaRef} type="text" className='box-border w-11/12 h-10 text-white outline-none bg-[#282a36] rounded-lg mr-2 z-30 resize-none p-2 overflow-auto' placeholder='Enter your query' onKeyUp={(e) => handleKeyUp(e)} value={prompt} onKeyDown={handleSubmit} onChange={handleChange} spellCheck="false" >
                </textarea>
                <MdSend className='text-gray-500 my-auto cursor-pointer mr-4 hover:text-white' size={24} onClick={handleUserSubmit} />
            </div>
        </div >
    )
}

export default ChatBotMainComponent