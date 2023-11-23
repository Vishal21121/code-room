import React from 'react'
import NotesCard from './NotesCard'
import { Link, useNavigate } from 'react-router-dom'

const Notes = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/notesForm')
    }
    return (
        <div>
            {/* Search Notes */}
            <form className='flex w-full p-4 justify-center mt-4 gap-4 sticky top-0 bg-[#22272E]'>
                <input type="text" placeholder='Enter title to search' className='bg-gray-700 w-1/2 p-4 rounded-lg text-gray-300 placeholder:text-left placeholder:text-xl outline-none' />
                <button onClick={handleClick} className="py-2 px-4 rounded-xl text-lg shadow-lg duration-500 outline-none ring-2 ring-solid ring-[#FF6C00] text-white font-medium cursor-pointer hover:shadow-4xl text-center" >Create Notes</button>
            </form>
            <h2 className='text-white text-center text-4xl mt-2'>Notes</h2>
            {/* Notes display section */}
            <div className='w-full flex gap-4 p-4 mt-4 flex-wrap justify-center'>
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
                <NotesCard />
            </div>
        </div>
    )
}

export default Notes