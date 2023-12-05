import React, { useEffect, useRef, useState } from 'react'
import { MdSend } from "react-icons/md";
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { useAskBotMutation, useCreateChatContainerMutation, useCreateChatMutation, useLazyGetChatsQuery } from '../../features/chat-bot/botApiSlice';
import { useParams } from 'react-router-dom';
import { setChatContainer, setChat } from '../../features/chat-bot/botSlice';
import toast from 'react-hot-toast';


const ChatBotMainComponent = () => {
    const chatRef = useRef(null)
    const textAreaRef = useRef(null);
    const [askBot] = useAskBotMutation()
    const [prompt, setPrompt] = useState("")
    const chat = useSelector(state => state.bot.chats)
    let id = useSelector(state => state.bot.chatContainer)
    const [createChatContainer] = useCreateChatContainerMutation()
    const [createChat] = useCreateChatMutation()
    const { roomId } = useParams()
    const dispatch = useDispatch()

    const saveChatsInBackend = async (id, content, senderType) => {
        const data = {
            chatContainerId: id,
            content,
            senderType
        }
        try {
            const response = await createChat(data).unwrap()
        } catch (error) {
            console.log(error);
        }
    }

    const handleUserSubmit = async () => {
        let containerId = id
        dispatch(setChat({ senderType: "user", content: prompt }))
        setPrompt("")
        setTimeout(() => {
            chatRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
        }, 0);

        if (!id) {
            const data = {
                roomId,
                "name": prompt
            }
            try {
                const response = await createChatContainer(data).unwrap()
                containerId = response.data.value._id
                dispatch(setChatContainer(response.data.value._id))
            } catch (error) {
                console.log(error);
            }
        }
        await saveChatsInBackend(containerId, prompt, "user")
        await fetchBotResponse(containerId)
    }

    const fetchBotResponse = async (containerId) => {
        // setChat((prev) => [...prev, { mode: "bot", text: "Please wait a moment while I gather my thoughts and process the information 😊" }])
        const body = {
            prompt
        }
        try {
            const toastId = toast.loading("Gathering thoughts. 😊")
            const response = await askBot(body).unwrap()
            toast.dismiss(toastId)
            dispatch(setChat({ senderType: "bot", content: response.data.response }))
            setTimeout(() => {
                chatRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
            }, 0);
            await saveChatsInBackend(containerId, response.data.response, "bot")
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
                        <ChatMessage mode={el.senderType} text={el.content} />
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