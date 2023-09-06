import React from 'react'
import { User, Mail, Lock } from "react-feather"

const Login = () => {
    return (
        <div className='flex justify-around items-center '>
            <div className='w-1/2' >
            </div>
            <div className="flex justify-center items-center w-1/2 min-h-screen bg-[#223243]">
                <div className="p-10 rounded-lg border-8 border-solid border-[#223243] shadow-3xl">
                    <div className="flex justify-center items-center flex-col gap-4">
                        <h2 className="text-white text-xl font-semibold tracking-widest">Sign up</h2>
                        <div className="relative w-[300px]">
                            <input type="text" required
                                className="pt-3 pr-4 pb-3 pl-12 w-full bg-[#223243] text-white font-light rounded-3xl text-lg shadow-lg duration-500 outline-none border border-solid border-[#0000001a]" />
                            <User className="relative bottom-[40px] left-5 w-6 py-[2px] pr-2 text-[#FF6C00] border-r border-solid border-r-[#FF6C00]" />
                            <span
                                className="absolute left-[5px] top-[2px] pt-3 pr-[10px] pb-3 pl-12 pointer-events-none text-base font-light duration-500 tracking-wider text-[#ffffff80] focus:text-[#FF6C00] focus:border focus:border-solid focus:border-[#FF6C00] focus:bg-[#223243 focus:translate-x-6 focus:translate-y-2 focus:text-xs focus:py-0 focus:px-2 focus:rounded-lg focus:-tracking-tighter">username</span>
                        </div>
                        <div className="relative w-[300px]">
                            <input type="email" required
                                className="pt-3 pr-4 pb-3 pl-12 w-full bg-[#223243] text-white font-light rounded-3xl text-lg shadow-lg duration-500 outline-none border border-solid border-[#0000001a]" />
                            <Mail className="relative bottom-[40px] left-5 w-6 py-[2px] pr-2 text-[#FF6C00] border-r border-solid border-r-[#FF6C00]" />
                            <span
                                className="absolute left-[5px] top-[2px] pt-3 pr-[10px] pb-3 pl-12 pointer-events-none text-base font-light duration-500 tracking-wider text-[#ffffff80]">email
                                address</span>
                        </div>
                        <div className="relative w-[300px]">
                            <input type="password" required
                                className="pt-3 pr-4 pb-3 pl-12 w-full bg-[#223243] text-white font-light rounded-3xl text-lg shadow-lg duration-500 outline-none border border-solid border-[#0000001a]" />
                            <Lock className="relative bottom-[40px] left-5 w-6 py-[2px] pr-2 text-[#FF6C00] border-r border-solid border-r-[#FF6C00]" />
                            <span
                                className="absolute left-[5px] top-[2px] pt-3 pr-[10px] pb-3 pl-12 pointer-events-none text-base font-light duration-500 tracking-wider text-[#ffffff80]">create
                                a password</span>
                        </div>
                        <div className="relative w-[300px]">
                            <input type="password" required
                                className="pt-3 pr-4 pb-3 pl-12 w-full bg-[#223243] text-white font-light rounded-3xl text-lg shadow-lg duration-500 outline-none border border-solid border-[#0000001a]" />
                            <Lock className="relative bottom-[40px] left-5 w-6 py-[2px] pr-2 text-[#FF6C00] border-r border-solid border-r-[#FF6C00]" />
                            <span
                                className="absolute left-[5px] top-[2px] pt-3 pr-[10px] pb-3 pl-12 pointer-events-none text-base font-light duration-500 tracking-wider text-[#ffffff80]">confirm
                                password</span>
                        </div>
                        <div className="relative w-[300px] flex flex-col justify-center">
                            <input type="submit" value="Create Account" className="pt-2 pr-4 pb-2 pl-4 w-full rounded-3xl text-lg shadow-lg duration-500 outline-none border border-solid border-[#0000001a] bg-[#FF6C00] text-white py-[10px] px-2 font-medium cursor-pointer hover:shadow-4xl" />
                            <p className='w-full mt-4 ml-16'>Already a member? <a href="" className="login">Log in</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login