import React, { useState, useEffect } from 'react'
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { TfiArrowLeft } from "react-icons/tfi";
import { useDispatch } from 'react-redux';
import { setNotesMode } from '../features/notes/notesSlice';
import { HiClipboard, HiCheckCircle } from "react-icons/hi";

const NotesView = ({ notesFound }) => {
    const dispatch = useDispatch()
    const [textCopied, setTextCopied] = useState("copy code");
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false)
            setTextCopied("copy code")
        }, 1000)
        return () => clearTimeout(timer)
    }, [copied, textCopied])

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
                                <div className='flex gap-1 p-1 self-end mx-2 cursor-pointer' onClick={() => { navigator.clipboard.writeText(children); setTextCopied("copied"); setCopied(true) }}>
                                    <button >
                                        {copied ? <HiCheckCircle size={22} className='text-green-500' /> : <HiClipboard size={22} className='text-gray-400' />}
                                    </button>
                                    <p className='text-white font-sans'>{textCopied}</p>
                                </div>
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