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
    return (
        <div className='flex w-screen'>
            <Navbar />
            {
                mode === modes['CODE-EDITOR'] && <IDE />
            }
            {
                mode === modes.PEOPLE && <People />
            }
            {
                mode === modes.BOARD && <Whiteboard />
            }
        </div>
    )
}

export default LandingPage