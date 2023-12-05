import React from 'react'
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setAccess } from '../../features/accessPermission/accessSlice';
import ACTIONS from '../../util/Actions';
import { useParams } from 'react-router-dom';

const Client = ({ people }) => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.userData.userData)
    const userName = userData.data.loggedInUser.username
    const permittedUser = useSelector((state) => state.access.access)
    const socketio = useSelector((state) => state.socket.socket)
    const { roomId } = useParams()

    const handleClick = (e) => {
        // console.log(userName, permittedUser);
        if (userName === permittedUser) {
            let changedPermissionUser = e.currentTarget.querySelector('.text-white').innerText
            console.log("user", changedPermissionUser);
            socketio.emit(ACTIONS.PERMISSION_CHANGE, { roomId, changedPermissionUser })
            dispatch(setAccess(changedPermissionUser))
        }
    }
    return (
        <div className="flex cursor-pointer" onClick={handleClick}>
            <div className='flex gap-2'>
                <div className='relative'>
                    <Avatar name={people} size={50} round="14px" className='after:bg-green-500' />
                    <span className="absolute bottom-0 left-10 transform translate-y-1/4 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
                <span className="text-white mt-4">{people}</span>
            </div>
        </div>
    )
}

export default Client