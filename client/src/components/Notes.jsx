import React from 'react'

const Notes = () => {
    return (
        <div>
            {/* Search Notes */}
            <form className='flex w-full p-4 justify-center mt-4 gap-4'>
                <input type="text" placeholder='Enter title to search' className='bg-gray-700 w-1/2 p-4 rounded-lg text-gray-300 placeholder:text-left placeholder:text-xl outline-none' />
                <input type="submit" value="Search" className="py-2 px-4  rounded-xl text-lg shadow-lg duration-500 outline-none ring-2 ring-solid ring-[#FF6C00] text-white font-medium cursor-pointer hover:shadow-4xl" />
            </form>
            {/* Notes display section */}
            <div className='w-full'>

            </div>
        </div>
    )
}

export default Notes