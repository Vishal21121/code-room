import React, { useState } from 'react'
import { Mail, Lock } from "react-feather"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setAccessToken, setUserData } from '../features/authentication/userDataSlice'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../features/authentication/authApiSlice'
import collab from "../assets/collab.svg"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })
    const [login, { isLoading }] = useLoginMutation()
    const loginUser = async () => {
        try {
            // The unwrap() method is used to extract the payload of a fulfilled action if it was resolved successfully, or throw an error with the rejected value if it was not.
            const userData = await login({ email: userDetails.email, password: userDetails.password }).unwrap()
            dispatch(setAccessToken(userData?.data?.accessToken))
            dispatch(setUserData(userData))
            toast.success("User logged in successfully")
            navigate("/createroom")
        } catch (err) {
            if (err.data.data.statusCode === 422) {
                console.log({ err });
                if (err.data.data.value[0].email) {
                    toast.error(err.data.data.value[0].email)
                } else {
                    toast.error(err.data.data.value[0].password)
                }
                return
            } else if (err.data.data.statusCode === 401) {
                toast.error(err.data.data.message)
                return
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(userDetails);
        await loginUser()
    }

    return (
        <div className="flex  justify-evenly items-center min-h-screen bg-gray-900">
            <p className='text-gray-300 text-[2.5rem] absolute right-0 top-56 left-[42rem] font-bold'>Let's Code</p>
            <img src={collab} alt="" className='w-1/2' />
            <div className="mt-14 p-10 rounded-lg border-8 border-solid border-[#223243] shadow-3xl">
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
                        <input type="submit" value="Login" className="pt-2 pr-4 pb-2 pl-4 w-full rounded-3xl text-lg shadow-lg duration-500 outline-none ring-2 ring-[#FF6C00] text-white py-[10px] px-2 font-medium cursor-pointer hover:shadow-4xl" onClick={handleSubmit} />
                        <p className='w-full mt-4 ml-16 text-gray-400'>Don't have a account? <Link to="/signin" className="hover:text-white">Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login