import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import IDE from '../components/IDE'
import modes from "../util/Mode"
import Whiteboard from '../components/Whiteboard'
import People from '../components/People'

const LandingPage = () => {
    const [mode, setMode] = useState("people")
    return (
        <div className='flex w-screen'>
            <Navbar setMode={setMode} mode={mode} />
            {
                mode === modes['CODE-EDITOR'] && <IDE />
            }
            {
                mode === modes.PEOPLE && <People />
            }
        </div>
    )
}

export default LandingPage