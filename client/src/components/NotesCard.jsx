import React from 'react'

const NotesCard = ({ id, title, showNotes }) => {
    return (
        <div className='w-72 p-4 bg-gray-700 rounded-md h-fit flex flex-col gap-4 cursor-pointer' id={id} onClick={() => showNotes(id)}>
            <h1 className='text-white text-xl truncate'>{title}</h1>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2'>
                    <button className='ring-2 ring-blue-700 px-2 py-1 rounded-lg text-white font-medium hover:ring-blue-500'>Edit</button>
                    <button className='ring-2 ring-pink-700 px-2 py-1 rounded-lg text-white font-medium hover:ring-pink-500'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default NotesCard