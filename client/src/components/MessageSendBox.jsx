import React, { useState } from 'react'
import { MdSend } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokens } from '../features/authentication/userDataSlice';
import ACTIONS from '../util/Actions';
import { useDebouncedCallback } from 'use-debounce';

const MessageSendBox = ({ fetchMessages }) => {
    const { roomId } = useParams()
    const [message, setMessage] = useState("")
    const userData = useSelector((state) => state.userData.userData)
    const userName = userData.data.loggedInUser.username
    const accessToken = useSelector((state) => state.userData.accessToken)
    const dispatch = useDispatch()
    const socketio = useSelector((state) => state.socket.socket)



    const handleSubmit = async (retry = true) => {
        const value = message
        setMessage("")
        const response = await fetch("http://localhost:8080/api/v1/room-features/send-message", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                roomId,
                username: userName,
                message: value
            })
        })
        const data = await response.json()
        if (data.data.statusCode === 201) {
            console.log("success");
            socketio.emit(ACTIONS.MESSAGE_SEND, { roomId, _id: data.data.value._id, username: userName, message: data.data.value.message })
        } else if (data.data.statusCode === 401 && retry) {
            dispatch(refreshTokens)
            await handleSubmit(retry = false)
        }
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div className='absolute bottom-0 flex bg-[#282a36] w-1/2 mx-auto p-2 rounded-lg mb-10 z-10 max-h-96 overflow-hidden border border-gray-700'>
            <textarea type="text" className='box-border w-11/12 h-10 text-white outline-none bg-[#282a36] rounded-lg mr-2 z-30 resize-none p-2 overflow-auto' placeholder='Message' spellCheck="false" onChange={handleChange} value={message} >
            </textarea>
            <MdSend className='text-gray-500 my-auto cursor-pointer mr-4 hover:text-white' size={24} onClick={handleSubmit} />
        </div>
    )
}

export default MessageSendBox