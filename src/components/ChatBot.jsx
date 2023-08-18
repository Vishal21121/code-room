import React from 'react'
import { Search } from 'react-feather'
import { useState } from 'react';


const ChatBot = () => {

    const [length, setLength] = useState(0)
    const [messageArr, setMessageArr] = useState([{ 'role': 'system', 'content': 'you are a code assistant who only answers coding questions and does not replies to prompt outside of coding topic' }])

    const addMessage = (data, type) => {
        if (type == 'user') {
            setMessageArr(prev => ({ ...prev, 'role': type, 'content': data }))
        } else if (type == "assistant") {
            setMessageArr(prev => ({ ...prev, 'role': type, 'content': data }))
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (e.target.code === 'Enter') {
            console.log("Hello");
        }
    }

    return (
        <div>
            <div className='absolute bottom-10 left-28 flex bg-[#282a36] w-[250px] p-2 rounded-lg'>
                <input type="text" className='w-48 text-white outline-none p-2 bg-[#282a36] rounded-lg  mr-2 focus:border' placeholder='Enter your query' onKeyUp={handleSubmit} />
                <Search className='text-white my-auto cursor-pointer' size={18} />
            </div>
        </div>
    )
}

export default ChatBot