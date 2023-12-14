import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/authentication/userDataSlice';
import { setRoom } from '../features/room/roomSlice';
import { setAccess } from '../features/accessPermission/accessSlice';
import { useAddBoardsMutation, useCreateRoomMutation, useGetRoomsQuery, useJoinRoomMutation } from '../features/room/roomApiSlice';
import BeatLoader from "react-spinners/BeatLoader";


const RoomJoin = () => {
    const [roomName, setRoomName] = useState("")
    const [Password, setPassword] = useState("")
    const navigate = useNavigate();
    const userData = useSelector(selectCurrentUser)
    const userName = userData.data.loggedInUser.username
    const dispatch = useDispatch()
    const [createOrJoin, setCreateOrJoin] = useState("Join")
    const {
        data: roomsData,
        isSuccess,
        isLoading
    } = useGetRoomsQuery(userName)
    const [createRoom] = useCreateRoomMutation()
    const [joinRoom] = useJoinRoomMutation()
    const [addBoard] = useAddBoardsMutation()
    const rooms = roomsData?.data.value

    const errorCodeResponse = async (data) => {
        console.log("data: ", data.data.data.statusCode)
        if (data.data.data.statusCode === 422) {
            toast.error(Object.values(data.data.data.value[0])[0])
        }
        else if (data.data.data.statusCode === 403) {
            toast.error("Please enter another room name")
            return;
        }
        else if (data.data.data.statusCode === 500) {
            toast.error(`Failed to ${createOrJoin.toLowerCase()} a new room`)
            return;
        }
        else if (data.data.data.statusCode === 404) {
            toast.error("Room does not exist")
        } else if (data.data.data.statusCode === 400) {
            console.log("inside 400");
            toast.error(`you have already joined this room`)
        }
    }

    const successCodeResponse = async (response) => {
        console.log({ response });
        if (response.data.statusCode === 201 || response.data.statusCode === 200) {
            dispatch(setRoom(response.data.value))
            dispatch(setAccess(response.data.value.admin))
            let createOrJoin;
            if (response.data.statusCode === 200) {
                createOrJoin = "Joined"
            } else {
                createOrJoin = "Created"
            }
            toast.success(`${createOrJoin}ed a new room`)
            navigate(`/room/${response.data.value._id}`)
            if (response.data.statusCode === 201) {
                const data = {
                    roomId: response.data.value._id
                }
                return await addBoard(data).unwrap()
            }
            return;
        }
    }

    const createNewRoomRequest = async () => {
        let body
        if (!roomName) {
            toast.error("ROOM name is required")
            return;
        }
        if (!Password) {
            toast.error("Password is required")
            return;
        }
        if (createOrJoin === "Create") {
            body = {
                name: roomName,
                users: [userName],
                password: Password,
                admin: userName,
                language: "javascript",
                version: "1.32.3"
            }
            let response
            try {
                response = await createRoom(body).unwrap()
                console.log({ response });
                successCodeResponse(response)

            } catch (error) {
                errorCodeResponse(response)
            }
            console.log("Create");
        } else {
            body = {
                name: roomName,
                password: Password,
                username: userName
            }
            let response;
            try {
                response = await joinRoom(body).unwrap()
                console.log("Joined room", response);
                successCodeResponse(response)
            } catch (error) {
                console.log("Got error: ", error);
                errorCodeResponse(error)
            }
        }
    }

    const handleEnter = (e) => {
        if (e.code === "Enter") {
            createNewRoomRequest()
        }
    }

    const handleClickOrJoin = (e) => {
        e.preventDefault()
        if (createOrJoin === "Create") {
            setCreateOrJoin("Join")
        } else {
            setCreateOrJoin("Create")
        }
    }

    const enterRoom = (e) => {
        e.preventDefault()
        const room = rooms.find((el) => el._id === e.currentTarget.id)
        const admin = room.admin
        console.log({ admin });
        dispatch(setAccess(admin))
        toast.success(`${createOrJoin}ed a new room`)
        navigate(`/room/${e.currentTarget.id}`)
    }

    return (
        <div className="bg-[#22272e] h-screen w-screen flex items-center text-center">
            <div className='w-[25%] h-full p-4 bg-gray-900 flex flex-col gap-8'>
                <p className='text-2xl text-gray-300 '>Rooms Joined</p>
                <hr />
                {
                    isLoading ? <BeatLoader color='#888888' className='mx-auto' /> : (
                        <div className='flex flex-col gap-4'>
                            {
                                isSuccess && rooms.length !== 0 ? rooms.map(({ _id, name }) => (
                                    <button key={_id} id={_id} className='p-2 bg-gray-700 text-white text-md font-semibold rounded-md hover:ring-2 hover:ring-[#FF6C00]' onClick={enterRoom}>{name}</button>
                                )) : <p className='text-gray-300'>No rooms joined</p>
                            }
                        </div>
                    )
                }
            </div>
            <div className="border w-[30%] h-fit rounded-lg p-8 mx-auto bg-gray-900 flex flex-col gap-4">
                <h4 className="text-gray-300 text-lg font-bold">{createOrJoin} room</h4>
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
                        onClick={createNewRoomRequest}
                    >
                        {createOrJoin}
                    </button>
                    <span className="text-gray-300">
                        {createOrJoin === "Join" ? "Create" : "Join"} &nbsp;
                        <a
                            onClick={handleClickOrJoin}
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