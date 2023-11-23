import React, { useState, useEffect } from 'react'
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { HiClipboard, HiCheckCircle } from "react-icons/hi";


const NotesForm = () => {
    const [copied, setCopied] = useState(false);
    const [textCopied, setTextCopied] = useState("copy code");
    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false)
            setTextCopied("copy code")
        }, 1000)
        return () => clearTimeout(timer)
    }, [copied, textCopied])

    const [notesInfo, setNotesInfo] = useState({
        title: "",
        content: ""
    })

    const handleClick = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <form className='flex w-full p-4 justify-center gap-4'>
                <input type="text" placeholder='Enter title' className='bg-gray-700 w-1/2 p-4 rounded-lg text-gray-300 placeholder:text-left placeholder:text-xl outline-none' onChange={(e) => setNotesInfo(notesInfo => ({ ...notesInfo, title: e.target.value }))} />
                <input type="submit" value="Create" className="py-2 px-4  rounded-xl text-lg shadow-lg duration-500 outline-none ring-2 ring-green-500 text-white font-medium cursor-pointer hover:shadow-green" />
            </form>
            <div className='flex w-full gap-2 p-2'>
                <textarea type="text" placeholder='Write your markdown code' className='bg-gray-700 w-1/2 p-4 rounded-lg text-gray-300  placeholder:text-lg placeholder:text-left outline-none h-[80vh] resize-none' onChange={(e) => setNotesInfo(notesInfo => ({ ...notesInfo, content: e.target.value }))} />
                <div className='w-1/2 rounded-lg bg-gray-700 text-white px-4  h-[80vh] overflow-auto'>
                    <ReactMarkdown
                        className='w-fit markdown'
                        children={notesInfo.content}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <div className='bg-gray-900 rounded-lg flex flex-col'>
                                        <div className='flex gap-1 p-1 self-end mx-2 cursor-pointer' onClick={() => { navigator.clipboard.writeText(children); setCopied(true); setTextCopied("copied") }}>
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