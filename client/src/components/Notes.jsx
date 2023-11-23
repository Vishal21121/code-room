import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NotesCard from './NotesCard'
import NotesForm from './NotesForm'
import { useCreateNotesMutation, useLazyGetAllNotesQuery } from '../features/notes/notesApiSlice';
import NotesView from './NotesView';
import { useDispatch, useSelector } from 'react-redux';
import { setNotesMode } from '../features/notes/notesSlice';

const Notes = () => {
    const { roomId } = useParams()
    console.log("roomId", roomId)
    const [notes, setNotes] = useState([])
    const [createNotes] = useCreateNotesMutation()
    const [getAllNotes] = useLazyGetAllNotesQuery()
    const dispatch = useDispatch()
    const notesMode = useSelector(state => state.notesMode.notesMode)
    // const [notesMode, setNotesMode] = useState("notes")
    const [notesFound, setNotesFound] = useState({})
    const handleSubmit = async (e, notesInfo) => {
        e.preventDefault()
        notesInfo.roomId = roomId
        try {
            const response = await createNotes(notesInfo).unwrap()
            dispatch(setNotesMode("notes"))
            console.log({ response });
            setNotes((notes) => [...notes, response.data.value])
        } catch (error) {
            console.log(error);
        }
    }
    const handleClick = () => {
        dispatch(setNotesMode("notesForm"))
    }

    const fetchNotes = async () => {
        try {
            const response = await getAllNotes({ roomId }).unwrap()
            console.log({ response });
            setNotes(response.data.value)
        } catch (error) {
            console.log(error);
        }
    }

    const showNotes = (id) => {
        console.log({ id });
        const notesFound = notes.find((el) => el._id === id)
        setNotesFound(notesFound)
        dispatch(setNotesMode("notesView"))
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <div className='h-screen bg-gray-900 overflow-auto'>
            {
                notesMode === "notesForm" && <NotesForm handleSubmit={handleSubmit} />

            }
            {
                notesMode === "notes" && (
                    <div>
                        {/* Search Notes */}
                        <form className='flex w-full p-4 justify-center gap-4 sticky top-0 bg-[#22272E]'>
                            <input type="text" placeholder='Enter title to search' className='bg-gray-700 w-1/2 p-4 rounded-lg text-gray-300 placeholder:text-left placeholder:text-xl outline-none' />
                            <button onClick={handleClick} className="py-2 px-4 rounded-xl text-lg shadow-lg duration-500 outline-none ring-2 ring-solid ring-[#FF6C00] text-white font-medium cursor-pointer hover:shadow-4xl text-center" >Create Notes</button>
                        </form>
                        <h2 className='text-white text-center text-4xl mt-2'>Notes</h2>
                        {/* Notes display section */}

                        <div className='w-full flex gap-4 p-4 mt-4 flex-wrap justify-center'>
                            {
                                notes.map(({ _id, title }) => (
                                    <NotesCard key={_id} id={_id} title={title} showNotes={showNotes} />
                                ))
                            }
                            {/* <NotesCard /> */}
                        </div>
                    </div>
                )
            }
            {
                notesMode === "notesView" && <NotesView notesFound={notesFound} />
            }

        </div>
    )
}

export default Notes