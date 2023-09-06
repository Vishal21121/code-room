import React, { useState } from 'react'
import { CheckCircle, Cpu, Edit, File, FilePlus } from 'react-feather';
import Files from './Files';
import ChatBot from './ChatBot';
import Todo from './Todo';


const Sidebar = ({ changeMode, fileNameGet }) => {
    const [filename, setFilename] = useState("")
    const [files, setFiles] = useState([])
    const [createFile, setCreateFile] = useState(false);


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
        <div className='w-[20%] bg-[#1c1e29] flex h-screen'>
            <div className='w-full max-w-full h-full overflow-auto'>
                <div className='p-2 bg-[#161a2a] flex items-center gap-4 w-full h-12 sticky z-10'>
                    <p className='text-white text-lg'>Files</p>
                    <FilePlus size={20} className='text-gray-500 hover:text-white my-1 cursor-pointer' onClick={handleFileClick} />
                </div>
                <div className='p-2'>
                    {
                        createFile ? <input type="text" autoFocus value={filename} onKeyUp={handleSubmit} onChange={e => setFilename(e.target.value)} className='p-2 w-full rounded-lg bg-transparent text-white border  placeholder:bg-white' /> : ""
                    }

                </div>
            </div>
        </div>
    )
}

export default Sidebar