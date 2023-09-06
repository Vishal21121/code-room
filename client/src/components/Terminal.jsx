import React from 'react'
import { X } from 'react-feather';


const Terminal = ({ output }) => {
  const closeTerminal = (e) => {
    e.preventDefault()
    let classList = document.getElementById("terminal").classList
    classList.add("invisible")
  }
  return (
    <div className='box-border bg-[#161a2a] p-4 relative bottom-72 flex flex-col w-[80%] ml-[20%] z-10 h-[40vh]' id='terminal'>
      <div className='flex '>
        <button className='text-white mx-4 focus:underline focus:underline-offset-8'>Problem</button>
        <button className='text-white mx-4 underline underline-offset-8 focus:underline focus:underline-offset-8' id='termEl'>Terminal</button>
        <X className='text-white absolute right-10 cursor-pointer' onClick={closeTerminal} />
      </div>
      <div className='text-gray-300 mt-4 mx-4'>{output}</div>
    </div>
  )
}

export default Terminal