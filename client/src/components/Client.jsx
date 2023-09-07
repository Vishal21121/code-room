import React from 'react'
import Avatar from 'react-avatar';

const Client = ({ people }) => {
    return (
        <div className="flex">
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