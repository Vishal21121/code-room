import React, { useState } from 'react'
import { MdSend } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokens } from '../../features/authentication/userDataSlice';
import ACTIONS from '../../util/Actions';
import { HiPlusCircle } from "react-icons/hi2";
import { storage } from '../../appwrite/appwriteConfig';
import { ID } from 'appwrite';
import { useSendMessageMutation } from '../../features/userMessage/userMessageApiSlice';

const MessageSendBox = () => {
    const { roomId } = useParams()
    const [message, setMessage] = useState("")
    const userData = useSelector((state) => state.userData.userData)
    const userName = userData.data.loggedInUser.username
    const accessToken = useSelector((state) => state.userData.accessToken)
    const dispatch = useDispatch()
    const socketio = useSelector((state) => state.socket.socket)
    const [sendMessage] = useSendMessageMutation()

    const handleSubmit = async (messageType, imageUrl) => {
        const value = message
        if (value) {
            messageType = "text"
        }
        setMessage("")
        console.log(messageType, imageUrl);
        const body = {
            roomId,
            username: userName,
            message: value,
            imageUrl: imageUrl,
            messageType: messageType
        }
        try {
            const response = await sendMessage(body).unwrap()
            console.log("success", response);
            socketio.emit(ACTIONS.MESSAGE_SEND, { roomId, value: response.data.value })
        } catch (error) {
            console.log(error);
        }
    }

    const handleKeyUp = (e) => {
        e.target.style.height = '2.5rem'
        let height = e.target.scrollHeight
        e.target.style.height = `${height}px`
    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            // Shift + Enter was pressed, do nothing
        }
        else if (e.key === "Enter") {
            e.preventDefault()
            return await handleSubmit()
        } else {
            setMessage(e.target.value)
        }
    }

    const handleUpload = async (data) => {
        const response = await storage.createFile(import.meta.env.VITE_BUCKET_ID, ID.unique(), data)
        let messageId = response.$id
        const filelink = storage.getFileView(import.meta.env.VITE_BUCKET_ID, messageId)
        const responseSubmit = await handleSubmit("media", filelink.href, true)
        const dataSubmitted = await responseSubmit.json()
        socketio.emit(ACTIONS.MESSAGE_SEND, { roomId, value: dataSubmitted.data.value })
    }

    const handlePaste = async (e) => {
        console.log(e.clipboardData.files[0]);
        await handleUpload(e.clipboardData.files[0])
    }

    return (
        <div className='absolute bottom-0 flex items-center bg-[#282a36] w-1/2 mx-auto p-2 rounded-lg mb-10 z-10'>
            <label htmlFor="file"><HiPlusCircle size={30} className='cursor-pointer text-gray-400' name='file' /></label>
            <input type="file" name="" id="file" className='hidden' accept='image/*' onChange={(e) => handleUpload(e.target.files[0])} />
            <textarea type="text" className='box-border w-11/12 h-10  max-h-52 text-white outline-none bg-[#282a36] rounded-lg mr-2 z-30 resize-none p-2 overflow-auto' placeholder='Send a message' spellCheck="false" onChange={(e) => setMessage(e.target.value)} value={message} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} onPaste={handlePaste} >
            </textarea>
            <MdSend className='text-gray-500 my-auto cursor-pointer mr-4 hover:text-white' size={24} onClick={handleSubmit} />
        </div>
    )
}

export default MessageSendBox