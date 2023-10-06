import React, { useState } from 'react'
import { Mail, Lock } from "react-feather"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUserData } from '../features/authentication/userDataSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })
    const loginUser = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/users/login", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userDetails.email,
                    password: userDetails.password
                })
            })
            const data = await response.json()
            if (data.data.statusCode === 401) {
                toast.error(data.data.message)
                return
            }
            else if (data.data.statusCode === 422) {
                if (data.data.value[0].email) {
                    toast.error(data.data.value[0].email)
                } else {
                    toast.error(data.data.value[0].password)
                }
                return
            }
            dispatch(setUserData(data))
            toast.success("User logged in successfully")
            navigate("/createroom")
        } catch (error) {
            console.log(error.message)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(userDetails);
        await loginUser()
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#223243]">
            <div className="p-10 rounded-lg border-8 border-solid border-[#223243] shadow-3xl">
                <div className="flex justify-center items-center flex-col gap-4">
                    <h2 className="text-gray-300 text-xl font-semibold tracking-widest">Sign up</h2>
                    <div className="relative w-[300px]">
                        <input
                            type="email"
                            required
                            className="pt-3 pr-4 pb-3 pl-12 w-full bg-[#223243] text-gray-300 font-light rounded-3xl text-lg shadow-lg duration-500 outline-none border border-solid border-[#0000001a] placeholder:text-base placeholder:font-light focus:ring-2 focus:ring-orange-500"
                            placeholder='Email'
                            onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                        />
                        <Mail className="relative bottom-[40px] left-5 w-6 py-[2px] pr-2 text-[#FF6C00] border-r border-solid border-r-[#FF6C00]" />
                    </div>
                    <div className="relative w-[300px]">
                        <input
                            type="password"
                            required
                            className="pt-3 pr-4 pb-3 pl-12 w-full bg-[#223243] text-gray-300 font-light rounded-3xl text-lg shadow-lg duration-500 outline-none border border-solid border-[#0000001a] placeholder:text-base placeholder:font-light focus:ring-2 focus:ring-orange-500"
                            placeholder='Password'
                            onChange={(e) => setUserDetails(prev => ({ ...prev, password: e.target.value }))}
                        />
                        <Lock className="relative bottom-[40px] left-5 w-6 py-[2px] pr-2 text-[#FF6C00] border-r border-solid border-r-[#FF6C00]" />
                    </div>
                    <div className="relative w-[300px] flex flex-col justify-center">
                        <input type="submit" value="Login" className="pt-2 pr-4 pb-2 pl-4 w-full rounded-3xl text-lg shadow-lg duration-500 outline-none border border-solid border-[#0000001a] bg-[#FF6C00] text-white py-[10px] px-2 font-medium cursor-pointer hover:shadow-4xl" onClick={handleSubmit} />
                        <p className='w-full mt-4 ml-16 text-gray-400'>Don't have a account? <Link to="/signin" className="hover:text-white">Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login