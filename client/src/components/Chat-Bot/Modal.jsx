import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { setApiKey, setModalView } from '../../features/chat-bot/botSlice';

const Modal = ({ visible, handleClose }) => {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState("")
    const handleSubmit = () => {
        if (document.getElementById("input").value === "") {
            return
        }
        dispatch(setApiKey(document.getElementById("input").value))
        console.log("value", document.getElementById("input").value);
        dispatch(setModalView(false))
    }
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <>
            {
                visible ? (
                    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center rounded-sm' >
                        <div className='flex flex-col bg-gray-800 w-1/2 p-2 gap-4'>
                            <div className='flex justify-between p-2'>
                                <div className="text-white text-xl">Api Key Required</div>
                                <RxCross1 className='text-xl text-gray-300 cursor-pointer mt-1' onClick={() => dispatch(setModalView(false))} />
                            </div>
                            <input
                                id="input"
                                type="password"
                                name=""
                                value={inputValue}
                                onChange={handleInputChange}
                                className='p-2 rounded-md outline-none' placeholder='OpenAI api key'
                            />
                            <button className='px-4 py-2 ring-2 ring-blue-500 hover:shadow-blue text-white text-lg w-fit rounded-md bg-gray-900 mx-auto my-2' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div >
                ) : ""
            }
        </>

    )
}

export default Modal