import React, { useState } from 'react'
import { RiBracesLine, RiPencilFill } from "react-icons/ri";
import { HiUsers, HiCheckBadge } from "react-icons/hi2";
import { SiDependabot } from "react-icons/si";
import modes from '../util/Mode';
import { useDispatch } from 'react-redux';
import { setMode } from '../features/mode/modeSlice';
import { useSelector } from 'react-redux';
import People from './People';


const Navbar = ({ peopleNav, todoNav }) => {
    const dispatch = useDispatch()
    const mode = useSelector((state) => state.mode.mode)
    return (
        <div className='px-4 py-14 h-screen bg-[#1d262f] w-[5%] flex flex-col gap-10 z-30'>
            <div className='rounded-full bg-[#0d65d9] mx-auto p-2'>
                <HiUsers onClick={peopleNav} size={28} className={`${mode === "people" ? "text-white" : "text-gray-900"} peer hover:text-white cursor-pointer`} />
            </div>

            <div className='rounded-full bg-[#0d65d9] mx-auto p-2'>
                <RiBracesLine onClick={() => dispatch(setMode(modes['CODE-EDITOR']))} size={28} className={`${mode === "code-editor" ? "text-white" : "text-gray-900"} hover:text-white cursor-pointer`} />
            </div>
            <div className='rounded-full bg-[#0d65d9] mx-auto p-2'>
                <RiPencilFill onClick={() => dispatch(setMode(modes.BOARD))} size={28} className={`${mode === "board" ? "text-white" : "text-gray-900"} hover:text-white cursor-pointer`} />
            </div>
            <div className='rounded-full bg-[#0d65d9] mx-auto p-2' onClick={todoNav}>
                <HiCheckBadge size={28} className={`${mode === "todo" ? "text-white" : "text-gray-900"} hover:text-white cursor-pointer`} />
            </div>
            <div className='rounded-full bg-[#0d65d9] mx-auto p-2'>
                <SiDependabot onClick={() => dispatch(setMode(modes.BOT))} size={28} className={`${mode === "bot" ? "text-white" : "text-gray-900"} hover:text-white cursor-pointer`} />
            </div>
            {/* <div className='rounded-full bg-blue-600 mx-auto p-2'>
                <FaRobot onClick={() => setMode("file")} size={28} className='text-gray-900 hover:text-white cursor-pointer' />
            </div> */}

            {/* <Edit onClick={changeMode} size={28} className='text-gray-500 hover:text-white cursor-pointer' />
            <CheckCircle onClick={() => setMode("todo")} size={28} className='text-gray-500 hover:text-white cursor-pointer' />
            <Cpu onClick={() => setMode("chat-bot")} size={28} className='text-gray-500 hover:text-white cursor-pointer' /> */}
        </div>
    )
}

export default Navbar