import React from 'react'
import { File } from 'react-feather'

const Files = ({ files }) => {
    return (
        <>
            {
                files.map((el) => {
                    return (
                        <div className='flex gap-2'>
                            <File size={18} className='text-white my-[3px]' />
                            <p className='text-white'>{el}</p>
                        </div>
                    )
                })
            }


        </>
    )
}

export default Files