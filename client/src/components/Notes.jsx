import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NotesCard from './NotesCard'
import NotesForm from './NotesForm'
import { useCreateNotesMutation, useDeletNotesMutation, useLazyGetAllNotesQuery } from '../features/notes/notesApiSlice';
import NotesView from './NotesView';
import { useDispatch, useSelector } from 'react-redux';
import { setNotesMode, setNotes, setNoteId, setEditMode } from '../features/notes/notesSlice';

const Notes = () => {
    const { roomId } = useParams()
    const dispatch = useDispatch()
    const notes = useSelector((state) => state.notes.notes)
    const [createNotes] = useCreateNotesMutation()
    const [getAllNotes] = useLazyGetAllNotesQuery()
    const [deletNotes] = useDeletNotesMutation()


    const notesMode = useSelector(state => state.notes.notesMode)
    const [notesFound, setNotesFound] = useState({})

    const handleSubmit = async (e, notesInfo) => {
        e.preventDefault()
        notesInfo.roomId = roomId
        try {
            const response = await createNotes(notesInfo).unwrap()
            dispatch(setNotesMode("notes"))
            const notesModified = [...notes, { ...response.data.value }]
            dispatch(setNotes(notesModified))
        } catch (error) {
            console.log(error);
        }
    }

    const fetchNotes = async () => {
        try {
            const response = await getAllNotes({ roomId }).unwrap()
            dispatch(setNotes([...response.data.value]))
        } catch (error) {
            console.log(error);
        }
    }

    const showNotes = (id) => {
        const notesFound = notes.find((el) => el._id === id)
        setNotesFound(notesFound)
        dispatch(setNotesMode("notesView"))
    }

    const deleteNoteHandler = async (id) => {
        const data = {
            notesId: id
        }
        try {
            const response = await deletNotes(data).unwrap()
            const notesModified = notes.filter((note) => note._id !== id)
            dispatch(setNotes(notesModified))
        } catch (error) {
            console.log(error);
        }
    }

    const updateNoteHandler = async (id) => {
        dispatch(setNoteId(id))
        dispatch(setEditMode(true))
        dispatch(setNotesMode("notesForm"))
    }

    useEffect(() => {
        fetchNotes()
    }, [notesMode === "notes"])

    const handleSearch = (e) => {
        e.preventDefault()
        const searchValue = e.target.value.toLowerCase()
        if (searchValue) {
            const notesModified = notes.filter((note) => note.title.toLowerCase().includes(searchValue))
            dispatch(setNotes(notesModified))
        } else {
            fetchNotes()
        }
    }

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
                            <input type="text" placeholder='Enter title to search' className='bg-gray-700 w-1/2 p-4 rounded-lg text-gray-300 placeholder:text-left placeholder:text-xl outline-none' onChange={(e) => handleSearch(e)} />
                            <button onClick={() => dispatch(setNotesMode("notesForm"))} className="py-2 px-4 rounded-xl text-lg shadow-lg duration-500 outline-none ring-2 ring-solid ring-[#FF6C00] text-white font-medium cursor-pointer hover:shadow-4xl text-center" >Create Notes</button>
                        </form>
                        <h2 className='text-white text-center text-4xl mt-2'>Notes</h2>
                        {/* Notes display section */}

                        <div className='w-full flex gap-4 p-4 mt-4 flex-wrap justify-center'>
                            {
                                notes && notes.map(({ _id, title }) => (
                                    <NotesCard key={_id} id={_id} title={title} showNotes={showNotes} deleteNoteHandler={deleteNoteHandler} updateNoteHandler={updateNoteHandler} />
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