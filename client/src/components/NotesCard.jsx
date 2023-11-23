import React from 'react'

const NotesCard = () => {
    return (
        <div className='w-72 p-4 bg-gray-700 rounded-md h-fit flex flex-col gap-4'>
            <h1 className='text-white text-xl truncate'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa iusto, quidem quasi asperiores ex aperiam corporis iure tenetur? Nam vel veritatis quaerat alias culpa quas rem amet sunt ipsam porro.</h1>
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