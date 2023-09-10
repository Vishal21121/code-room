import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from "uuid"
import toast from "react-hot-toast"

const RoomJoin = () => {

    const [roomId, setRoomId] = useState("")
    const navigate = useNavigate();

    const createNewRoom = (e) => {
        e.preventDefault()
        const id = uuidv4()
        setRoomId(id)
        toast.success("Created a new room")
    }

    const joinRoom = () => {
        if (!roomId) {
            toast.error("ROOM ID is required")
            return;
        }
        // we are passing the username to /editor/roomId route
        navigate(`/${roomId}`)
    }

    const handleInputEnter = (e) => {
        if (e.code === "Enter") {
            joinRoom()
        }
    }

    return (
        <div className="bg-[#22272e] h-screen w-screen flex flex-col justify-center text-center">
            <div className="border w-[30%] h-fit rounded-lg p-8 mx-auto bg-gray-900 flex flex-col gap-4">
                <h4 className="text-gray-300 text-lg font-bold">Paste invitation ROOM ID</h4>
                <div className="flex flex-col gap-4 items-center">
                    <input
                        type="text"
                        className="p-2 rounded-lg bg-gray-200 outline-none border-none placeholder:font-bold placeholder:text-gray-400 w-full font-bold"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <button className="px-8 py-2 bg-[#FF6C00] w-fit rounded-lg text-white text-bold text-lg hover:shadow-4xl"
                        onClick={joinRoom}
                    >
                        Join
                    </button>
                    <span className="text-gray-300">
                        If you don't have an invite then create &nbsp;
                        <a
                            onClick={createNewRoom}
                            href=""
                            className="text-[#FF6C00] underline underline-offset-4 hover:text-[#ff6a00c6]"
                        >
                            new room
                        </a>
                    </span>
                </div>
            </div>
        </div>

    )
}

export default RoomJoin