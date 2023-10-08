import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../features/authentication/userDataSlice';


const RoomJoin = () => {
    const [roomName, setRoomName] = useState("")
    const [Password, setPassword] = useState("")
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.userData.accessToken)
    const userData = useSelector((state) => state.userData.userData)
    const userName = userData.data.loggedInUser.username
    const dispatch = useDispatch()
    console.log("above");

    const createNewRoomRequest = async (accessToken) => {
        const response = await fetch("http://localhost:8080/api/v1/room/create-room", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                name: roomName,
                users: [userName],
                password: Password,
                admin: userName
            })
        })
        const data = await response.json()
        if (data.data.statusCode === 201) {
            console.log("inside");
            toast.success("Created a new room")
            console.log("roomId", data.data.value._id);
            navigate(`/room/${data.data.value._id}`)
            return;
        } else {
            return data.data.statusCode
        }
    }

    const createNewRoom = async () => {
        if (!roomName) {
            toast.error("ROOM name is required")
            return;
        }
        if (!Password) {
            toast.error("Password is required")
            return;
        }
        try {
            let statusCode = await createNewRoomRequest(accessToken)
            if (statusCode === 403) {
                toast.error("Please enter another room name")
                return;
            }
            else if (statusCode === 500) {
                toast.error("Failed to create a new room")
                return;
            }
            else if (statusCode === 401) {
                console.log("entered");
                const response = await fetch("http://localhost:8080/api/v1/users/refreshToken", {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                let data = await response.json()
                console.log("token", data.data.accessToken);
                dispatch(setAccessToken(data.data.accessToken))
                await createNewRoomRequest(data.data.accessToken)
            }
        } catch (error) {
            console.log(error.message);
        }

    }
    const handleEnter = (e) => {
        if (e.code === "Enter") {
            createNewRoom()
        }
    }

    return (
        <div className="bg-[#22272e] h-screen w-screen flex flex-col justify-center text-center">
            <div className="border w-[30%] h-fit rounded-lg p-8 mx-auto bg-gray-900 flex flex-col gap-4">
                <h4 className="text-gray-300 text-lg font-bold">Create room</h4>
                <div className="flex flex-col gap-4 items-center">
                    <input
                        type="text"
                        className="p-2 rounded-lg bg-gray-200 outline-none border-none placeholder:text-black w-full font-semi-bold"
                        placeholder="Room Name"
                        onChange={(e) => setRoomName(e.target.value)}
                        value={roomName}
                        onKeyUp={handleEnter}
                    />
                    <input
                        type="password"
                        className="p-2 rounded-lg bg-gray-200 outline-none border-none placeholder:text-black w-full font-semi-bold"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={Password}
                        onKeyUp={handleEnter}
                    />
                    <button className="px-8 py-2 bg-[#FF6C00] w-fit rounded-lg text-white text-bold text-lg hover:shadow-4xl"
                        onClick={createNewRoom}
                    >
                        Create
                    </button>
                    <span className="text-gray-300">
                        Join &nbsp;
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