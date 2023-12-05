import React, { useState, useEffect } from 'react'
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { TfiArrowLeft } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux';
import { setEditMode, setNotes, setNotesMode } from '../../features/notes/notesSlice';
import { useUpdateNotesMutation } from '../../features/notes/notesApiSlice';

const NotesForm = ({ handleSubmit }) => {
    const mode = useSelector(state => state.notes.editMode)
    const notes = useSelector(state => state.notes.notes)
    const id = useSelector(state => state.notes.noteId)
    const specificNote = notes.find((el) => el._id === id)
    const [updateNotes] = useUpdateNotesMutation()
    const dispatch = useDispatch()

    const [notesInfo, setNotesInfo] = useState({
        title: "",
        content: ""
    })

    useEffect(() => {
        if (mode) {
            setNotesInfo((notesInfo) => ({ ...notesInfo, title: specificNote.title, content: specificNote.content }))
        }
    }, [mode])

    const updateNotesHandler = async (e, notesInfo) => {
        e.preventDefault()
        notesInfo.notesId = id
        try {
            const response = await updateNotes(notesInfo).unwrap()
            dispatch(setNotesMode("notes"))
            console.log({ response });
        } catch (error) {
            console.log(error);
        }
        dispatch(setEditMode(false))
    }


    return (
        <div>
            <form className='flex w-full py-4 justify-center gap-4 h-28 items-center'>
                <div className='flex gap-3 py-2 px-4 rounded-xl text-lg shadow-lg duration-500 outline-none ring-2 ring-solid ring-blue-500 text-white font-medium cursor-pointer hover:shadow-blue text-center w-fit my-4' onClick={() => { dispatch(setNotesMode("notes")); dispatch(setEditMode(false)) }}>
                    <TfiArrowLeft className='mt-1' />
                    <p>Back</p>
                </div>
                <input type="text" placeholder='Enter title' value={notesInfo.title} className='bg-gray-700 w-1/2 p-4 rounded-lg text-gray-300 placeholder:text-left placeholder:text-xl outline-none h-16' onChange={(e) => setNotesInfo(notesInfo => ({ ...notesInfo, title: e.target.value }))} />
                {
                    mode ? (
                        <button value="Create" className="w-24 h-12 px-4 rounded-xl text-lg shadow-lg duration-500 outline-none ring-2 ring-green-500 text-white font-medium cursor-pointer hover:shadow-green" onClick={(e) => updateNotesHandler(e, notesInfo)} >Save</button>
                    ) : (
                        <button value="Create" className="w-24 h-12 px-4 rounded-xl text-lg shadow-lg duration-500 outline-none ring-2 ring-green-500 text-white font-medium cursor-pointer hover:shadow-green" onClick={(e) => handleSubmit(e, notesInfo)} >Create</button>
                    )
                }
            </form>
            <div className='flex w-full gap-2 p-2'>
                <textarea type="text" placeholder='Write your markdown code' className='bg-gray-700 w-1/2 p-4 rounded-lg text-gray-300  placeholder:text-lg placeholder:text-left outline-none h-[80vh] resize-none' value={notesInfo.content} onChange={(e) => setNotesInfo(notesInfo => ({ ...notesInfo, content: e.target.value }))} />
                <div className='w-1/2 rounded-lg bg-gray-700 text-white px-4 h-[80vh] overflow-auto'>
                    <ReactMarkdown
                        className='w-fit markdown'
                        children={notesInfo.content}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <div className='bg-gray-900 rounded-lg flex flex-col'>
                                        <SyntaxHighlighter
                                            {...props}
                                            children={String(children).replace(/\n$/, '')}
                                            style={dracula}
                                            language={match[1]}
                                            customStyle={{
                                                padding: "25px",
                                                margin: "0px"
                                            }}
                                            wrapLongLines="true"
                                        />
                                    </div>
                                ) : (
                                    <code {...props} className={className}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default NotesForm