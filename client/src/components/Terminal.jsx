import React, { useState } from 'react'
import { X } from 'react-feather';
import { useSelector } from 'react-redux';
import { HiOutlineXCircle } from "react-icons/hi2";



const Terminal = ({ output }) => {
  const problems = useSelector((state) => state.problems.problems)
  const [outputShow, setOutputShow] = useState(true)
  const closeTerminal = (e) => {
    e.preventDefault()
    let classList = document.getElementById("terminal").classList
    classList.add("invisible")
  }
  return (
    <div className='box-border bg-[#161a2a] p-4 relative bottom-72 flex flex-col w-[100%] z-10 h-[40vh]' id='terminal'>
      <div className='flex '>
        <button className={`text-white mx-4 ${!outputShow ? "underline underline-offset-8" : ""}`} onClick={() => setOutputShow(false)}>Problem</button>
        <button className={`text-white mx-4 ${outputShow ? "underline underline-offset-8" : ""}`} id='termEl' onClick={() => setOutputShow(true)}>Terminal</button>
        <X className='text-white absolute right-10 cursor-pointer' onClick={closeTerminal} />
      </div>
      {
        !outputShow ? (
          <div className='flex flex-col mt-4 mx-4 gap-1'>
            {
              problems.map((el) => (
                <div className='flex gap-1'>
                  <HiOutlineXCircle size={24} className='text-red-500' />
                  <p className='text-gray-300'>{el}</p>
                </div>
              ))
            }
          </div>
        ) : <pre className='text-gray-300 mt-4 mx-4'>{output}</pre>
      }
    </div>
  )
}

export default Terminal