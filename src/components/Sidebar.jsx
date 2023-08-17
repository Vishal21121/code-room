import React, { useState } from 'react'
import { Flexboard } from '@dorbus/flexboard';
import { CheckCircle, Cpu, Edit, File, FilePlus } from 'react-feather';
import Files from './Files';


const Sidebar = () => {
    const [filename, setFilename] = useState("")
    const [files, setFiles] = useState([])

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(e.code === "Enter"){
            setFiles(prev=>([...prev,filename]))
            setFilename("")
        }
    }
    return (
        <div className='w-1/4 bg-[#21252b] flex'>
            {/* icons section */}
            <div className='p-4 flex flex-col justify-start gap-10 bg-[#252a32] w-1/4'>
                <File size={28} className='text-white' />
                <Edit size={28} className='text-white' />
                <CheckCircle size={28} className='text-white' />
                <Cpu size={28} className='text-white' />
            </div>
            {/* file */}
            <div className='w-full'>
                <div className='p-2 bg-[#252a32] flex gap-4 w-full'>
                    <p className='text-white text-lg'>Files</p>
                    <FilePlus size={20} className='text-white my-1 cursor-pointer' />
                </div>
                <div className='p-2'>
                    <input type="text" value={filename} onKeyUp={handleSubmit} onChange={e=>setFilename(e.target.value)} className='p-2 w-full rounded-lg bg-transparent text-white border  placeholder:bg-white' />
                </div>
                <div className='p-4 flex gap-4 flex-col '>
                    <Files files={files}/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar