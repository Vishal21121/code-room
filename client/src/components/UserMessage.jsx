import React from 'react'
import Avatar from 'react-avatar';


const UserMessage = ({ username, message }) => {
    console.log({ username, message });
    return (
        <div>
            <div className='flex gap-2'>
                <Avatar name={username} size={40} round="20px" />
                <div className='flex flex-col'>
                    <p className='text-white'>{username}</p>
                    <p className='text-gray-300'>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default UserMessage