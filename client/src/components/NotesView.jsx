import React from 'react'
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { TfiArrowLeft } from "react-icons/tfi";
import { useDispatch } from 'react-redux';
import { setNotesMode } from '../features/notes/notesSlice';

const NotesView = ({ notesFound }) => {
    const dispatch = useDispatch()
    const content = notesFound.content
    return (
        <div className='w-full p-4 h-full'>
            <div className='flex gap-3 py-2 px-4 rounded-xl text-lg shadow-lg duration-500 outline-none ring-2 ring-solid ring-blue-500 text-white font-medium cursor-pointer hover:shadow-blue text-center w-fit my-4' onClick={() => dispatch(setNotesMode("notes"))}>
                <TfiArrowLeft className='mt-1' />
                <p>Back</p>
            </div>
            <ReactMarkdown
                className='w-fit markdown text-gray-300 bg-gray-900 px-12 py-4'
                children={content}
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
                                        margin: "0px",
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
    )
}

export default NotesView