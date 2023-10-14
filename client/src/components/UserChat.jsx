import React, { useEffect, useRef, useState } from 'react'
import MessageSendBox from './MessageSendBox'
import UserMessage from './UserMessage'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ACTIONS from '../util/Actions'
import { refreshTokens } from '../features/authentication/userDataSlice';

const UserChat = () => {
    const [chats, setChats] = useState([])
    const accessToken = useSelector((state) => state.userData.accessToken)
    const { roomId } = useParams()
    const socketio = useSelector((state) => state.socket.socket)
    const dispatch = useDispatch()
    const chatRef = useRef(null)


    const fetchMessages = async (retry = true) => {
        const response = await fetch("http://localhost:8080/api/v1/room-features/get-message", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                roomId,
            })
        })
        const data = await response.json()
        if (data.data.statusCode === 200) {
            setChats(data.data.value)
            setTimeout(() => {
                chatRef.current?.lastElementChild?.scrollIntoView();
            }, 0);
        } else if (data.data.statusCode === 401 && retry) {
            dispatch(refreshTokens())
            await fetchMessages(retry = false)
        }
    }

    useEffect(() => {
        fetchMessages()
        if (socketio) {
            socketio.on(ACTIONS.MESSAGE_SEND, ({ _id, username, message }) => {
                setChats((prev) => [...prev, { _id, username, message }])
                setTimeout(() => {
                    chatRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
                }, 0);
            })
        }
        return () => {
            socketio?.off(ACTIONS.MESSAGE_SEND)
        }
    }, [socketio])

    return (
        <div className='w-full h-screen flex flex-col items-center p-4'>
            <div className='w-full h-[75%] max-h-[75%] overflow-auto gap-4 flex flex-col mt-8  p-4' ref={chatRef}>
                {
                    chats && chats.map(({ username, message, _id }) => (
                        <UserMessage key={_id} username={username} message={message} />
                    ))
                }
            </div>
            <MessageSendBox fetchMessages={fetchMessages} />
        </div>
    )
}

export default UserChat