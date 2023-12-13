import React, { useEffect, useRef, useState } from 'react'
import MessageSendBox from './MessageSendBox'
import UserMessage from './UserMessage'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ACTIONS from '../../util/Actions'
import { useLazyGetMessageQuery } from '../../features/userMessage/userMessageApiSlice'

const UserChat = () => {
    const [chats, setChats] = useState([])
    const accessToken = useSelector((state) => state.userData.accessToken)
    const { roomId } = useParams()
    const socketio = useSelector((state) => state.socket.socket)
    const chatRef = useRef(null)
    const [getMessage] = useLazyGetMessageQuery();


    const fetchMessages = async () => {
        const response = await getMessage({ roomId }).unwrap()
        setChats(response.data.value)
        setTimeout(() => {
            chatRef.current?.lastElementChild?.scrollIntoView();
        }, 0);
    }

    useEffect(() => {
        fetchMessages()
        if (socketio) {
            socketio.on(ACTIONS.MESSAGE_SEND, ({ value }) => {
                setChats((prev) => [...prev, value])
                setTimeout(() => {
                    chatRef.current?.lastElementChild?.scrollIntoView();
                }, 0);
            })
        }
        return () => {
            socketio?.off(ACTIONS.MESSAGE_SEND)
        }
    }, [socketio])

    // TODO: add gif search for the message

    return (
        <div className='w-full h-screen flex flex-col items-center p-4 bg-[#080B19]'>
            <div className='w-full h-[83%] overflow-auto gap-4 flex flex-col mt-8  p-4 scrollbar-rounded' ref={chatRef}>
                {
                    chats && chats.map(({ username, message, _id, createdAt, messageType, imageUrl }) => (
                        <UserMessage key={_id} username={username} message={message} createdAt={createdAt} messageType={messageType} imageUrl={imageUrl} />
                    ))
                }
            </div>
            <MessageSendBox fetchMessages={fetchMessages} />
        </div>
    )
}

export default UserChat