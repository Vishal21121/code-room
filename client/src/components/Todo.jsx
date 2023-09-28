import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { TbCircleCheckFilled } from "react-icons/tb";

const Todo = ({ isTodo }) => {
    const todos = useSelector((state) => state.todo.todo)
    console.log({ todos });
    return (
        <div className={`w-72 bg-[#1c1e29] flex flex-col gap-4 p-8 absolute z-20 left-[77px] h-screen -translate-x-[130%] ${isTodo ? "translate-x-[0%] duration-300 ease-in-out" : "-translate-x-[130%] duration-300 ease-in-out"}`}>
            <p className="text-xl text-white font-bold">Todos</p>
            {
                todos && todos.map((el) => (
                    <div className='flex gap-2'>
                        <TbCircleCheckFilled size="24" className='text-green-500' />
                        <p className="text-white">{`TODO: ${el}`}</p>
                    </div>
                ))
            }

        </div>
    )
}

export default Todo