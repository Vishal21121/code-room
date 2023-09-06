import React from 'react'
import Client from "./Client"

const People = () => {
    let people = ["Vishal", "Kunal", "Shubham", "Sonny"]
    return (
        <div className='w-[20%] bg-[#1c1e29] flex flex-col gap-10 p-8'>
            {
                people.map((el) => (
                    <Client people={el} />
                ))
            }

        </div>
    )
}

export default People