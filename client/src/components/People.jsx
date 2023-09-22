import React from 'react'
import Client from "./Client"
import { useSelector } from 'react-redux'

const People = ({ isPeople }) => {
    let peopleGot = useSelector((state) => state.client.clients)
    console.log({ peopleGot });
    return (
        <div className={`w-72 bg-[#1c1e29] flex flex-col gap-10 p-8 absolute z-20 left-[77px] h-screen -translate-x-[130%] ${isPeople ? "translate-x-[0%] duration-300 ease-in-out" : "-translate-x-[130%] duration-300 ease-in-out"}`}>
            {
                peopleGot.map((el) => (
                    <Client people={el} />
                ))
            }
        </div>
    )
}

export default People