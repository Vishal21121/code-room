import React, { useRef } from 'react'
import { Edit, Trash2, ChevronDown } from "react-feather"

const Todo = () => {
    const doingRef = useRef(null)
    const doneRef = useRef(null)
    const handleClick = (val) => {
        if (val == "doing") {
            if(doingRef.current.classList.contains("hidden")){
                doingRef.current.classList.remove("hidden")
            }else{
                doingRef.current.classList.add("hidden")
            }
        } else {
            if(doneRef.current.classList.contains("hidden")){
                doneRef.current.classList.remove("hidden")
            }else{
                doneRef.current.classList.add("hidden")
            }
        }
    }

    return (
        <div className='flex flex-col h-full '>
            <h2 className='text-center text-gray-400 text-lg mt-4 mb-2'>Create Your Todo</h2>
            <input type="text" name="" id="" placeholder='Create your todo' className='p-2 mx-2 rounded-lg outline-none bg-[#282a36] text-gray-400' />
            {/* Todos section */}
            <div className='h-fit max-h-32  p-4 overflow-auto flex flex-col gap-4'>
                <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between'>
                    <p className='w-48'>Things to do</p>
                    <Edit className='mx-1' />
                    <Trash2 className='mx-1' />
                </div>
            </div>
            {/* Doing */}
            <div className='p-4'>
                <div className='flex justify-between cursor-pointer' onClick={()=>handleClick("doing")}>
                    <div className='cursor-pointer text-gray-400'>Doing</div>
                    <ChevronDown className='text-gray-400' />
                </div>
                <div className='h-fit my-4 max-h-32 hidden overflow-auto' ref={doingRef}>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                </div>
            </div>
            {/* Done */}
            <div className='p-4'>
                <div className='flex justify-between cursor-pointer' onClick={()=>handleClick("done")}>
                    <div className='cursor-pointer text-gray-400'>Done</div>
                    <ChevronDown className='text-gray-400' />
                </div>
                <div className='h-fit my-4 max-h-32 hidden overflow-auto' ref={doneRef}>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                    <div className='p-2 rounder-lg bg-[#282a36] text-gray-400 flex justify-between my-2'>
                        <p className='w-48'>Things to do</p>
                        <Edit className='mx-1' />
                        <Trash2 className='mx-1' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo