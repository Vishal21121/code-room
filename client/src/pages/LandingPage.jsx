import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import IDE from '../components/IDE'
import modes from "../util/Mode"
import Whiteboard from '../components/Whiteboard'
import People from '../components/People'
import { useSelector } from 'react-redux'
import { Excalidraw } from "@excalidraw/excalidraw";


const LandingPage = () => {
    const mode = useSelector((state) => state.mode)
    const [isPeople, setIsPeople] = useState(false)
    const peopleNav = () => {
        setIsPeople(prev => !prev)
    }
    return (
        <div className='flex w-screen'>
            <Navbar peopleNav={peopleNav} />
            <People isPeople={isPeople} />
            <div className='w-[95%]'>
                {
                    mode === modes['CODE-EDITOR'] && <IDE />
                }
                {
                    mode === modes.BOARD && <Whiteboard />
                }
            </div>
        </div>
    )
}

export default LandingPage