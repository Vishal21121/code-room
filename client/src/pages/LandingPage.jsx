import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import IDE from '../components/IDE'
import modes from "../util/Mode"
import Whiteboard from '../components/Whiteboard'
import People from '../components/People'
import { useSelector, useDispatch } from 'react-redux'
import ChatBot from '../components/ChatBot'
import { useNavigate, useParams } from 'react-router-dom'
import ACTIONS from '../util/Actions'
import toast from 'react-hot-toast'
import { initSocket } from '../util/socket'
import { setSocket } from '../features/sockets/socketSlice'
import { setClient, removeClient } from '../features/clients/clientSlice'


const LandingPage = () => {
    const mode = useSelector((state) => state.mode.mode)
    const userData = useSelector((state) => state.userData.userData)
    const [isPeople, setIsPeople] = useState(false)
    const navigate = useNavigate()
    const { roomId } = useParams()
    const dispatch = useDispatch()

    const peopleNav = () => {
        setIsPeople(prev => !prev)
    }

    useEffect(() => {
        const socketio = initSocket()
        dispatch(setSocket(socketio))
        console.log({ socketio });
        socketio.on('connect_error', (err) => handleErrors(err));
        socketio.on('connect_failed', (err) => handleErrors(err));

        function handleErrors(e) {
            console.log('socket error', e);
            toast.error('Socket connection failed, try again later.');
            navigate('/');
        }

        socketio.emit(ACTIONS.JOIN, {
            roomId,
            username: userData.data.loggedInUser.username,
        });

        socketio.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
            if (username !== userData.data.loggedInUser.username) {
                toast.success(`${username} joined the room.`);
                console.log(`${username} joined`);
            }
            dispatch(setClient(clients))
        })

        socketio.on(
            ACTIONS.DISCONNECTED,
            ({ socketId, username }) => {
                toast.success(`${username} left the room.`);
                dispatch(removeClient(username))
            }
        );

        return () => {
            socketio?.disconnect();
        };
    }, [])

    return (
        <div className='flex bg-[#22272e]'>
            <Navbar peopleNav={peopleNav} />
            <People isPeople={isPeople} />
            <div className='w-[95%]'>
                {
                    mode === modes['CODE-EDITOR'] && <IDE />
                }
                {
                    mode === modes.BOARD && <Whiteboard />
                }
                {
                    mode === modes.BOT && <ChatBot />
                }
            </div>
        </div>
    )
}

export default LandingPage