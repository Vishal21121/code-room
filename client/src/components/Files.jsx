import React from 'react'
import { File } from 'react-feather'

const Files = ({ files, fileClicked }) => {
    const handleClick = (e)=>{
       fileClicked(e.currentTarget.firstElementChild.nextElementSibling.innerText)
    }
    return (
        <>
            {
                files.map((el) => {
                    return (
                        <div className='flex gap-2 cursor-pointer' onClick={handleClick} >
                            <File size={18} className='text-white my-[3px]' />
                            <p  className='text-white'>{el}</p>
                        </div>
                    )
                })
            }


        </>
    )
}

export default Files