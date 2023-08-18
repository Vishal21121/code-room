import React, { useState } from 'react'
import { CheckCircle, Cpu, Edit, File, FilePlus } from 'react-feather';
import Files from './Files';
import ChatBot from './ChatBot';
import Todo from './Todo';


const Sidebar = ({ changeMode, fileNameGet }) => {
    const [filename, setFilename] = useState("")
    const [files, setFiles] = useState([])
    const [createFile, setCreateFile] = useState(false);
    const [mode, setMode] = useState("file")

    const fileClicked = (fileVal) => {
        fileNameGet(fileVal)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.code === "Enter") {
            setFiles(prev => ([...prev, filename]))
            setFilename("")
            setCreateFile(false)
        }
    }

    const handleFileClick = () => {
        setCreateFile(prev => !prev)
    }

    return (
        <div className='w-1/4 bg-[#21252b] flex h-screen'>
            {/* icons section */}
            <div className='p-4 flex flex-col justify-start gap-10 bg-[#252a32] w-1/4'>
                <File onClick={() => setMode("file")} size={28} className='text-gray-500 hover:text-white cursor-pointer' />
                <Edit onClick={changeMode} size={28} className='text-gray-500 hover:text-white cursor-pointer' />
                <CheckCircle onClick={() => setMode("todo")} size={28} className='text-gray-500 hover:text-white cursor-pointer' />
                <Cpu onClick={() => setMode("chat-bot")} size={28} className='text-gray-500 hover:text-white cursor-pointer' />
            </div>
            {/* file */}
            <div className='w-full max-w-full h-full overflow-auto'>
                <div className='p-2 bg-[#252a32] flex gap-4 w-full h-[6%] sticky z-10'>
                    <p className='text-white text-lg'>Files</p>
                    <FilePlus size={20} className='text-gray-500 hover:text-white my-1 cursor-pointer' onClick={handleFileClick} />
                </div>
                <div className='p-2'>
                    {
                        createFile ? <input type="text" autoFocus value={filename} onKeyUp={handleSubmit} onChange={e => setFilename(e.target.value)} className='p-2 w-full rounded-lg bg-transparent text-white border  placeholder:bg-white' /> : ""
                    }

                </div>
                <div>
                    {
                        mode === "file" ? (
                            <div className='p-4 flex gap-4 flex-col '>
                                <Files files={files} fileClicked={fileClicked} />
                            </div>
                        ) : ""
                    }
                    {
                        mode === "todo" ? (
                            <Todo />
                        ) : ""
                    }
                    {
                        mode === "chat-bot" ? (
                            <ChatBot />
                        ) : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar