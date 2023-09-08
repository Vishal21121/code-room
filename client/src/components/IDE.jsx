import React, { useEffect, useState, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Terminal from './Terminal';
import Whiteboard from './Whiteboard';
import CodeEditor from './CodeEditor';
import { initSocket } from '../util/socket';


const IDE = () => {
    const navigate = useNavigate()
    const [output, setOutput] = useState("")
    const [whiteboard, setWhiteboard] = useState(false)
    // shift this state in store
    const socketRef = useRef(null);

    const handleSubmit = async (e, code) => {
        console.log("called", typeof code)
        if (!code) {
            return
        }
        e.preventDefault()
        document.getElementById("terminal").classList.remove("invisible")
        document.getElementById("termEl").click()
        const result = await fetch("https://emkc.org/api/v2/piston/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language: 'javascript',
                version: '1.32.3',
                "files": [{ content: code }],
            })
        })
        let data = await result.json()
        console.log("code compiled: ", data);
        if (data.run.stdout) {
            setOutput(data.run.stdout)
            toast.success("Code compiled successfully")
        } else {
            setOutput(data.run.stderr)
            toast.error("error in the code")
        }
    }


    // switches between editor and whiteboard
    const switcher = () => {
        setWhiteboard(prev => !prev)
    }


    // useEffect(() => {
    //     document.addEventListener("keydown", toggleTerminal)
    //     const init = async () => {
    //         socketRef.current = await initSocket()
    //         console.log(socketRef.current);
    //         // socketRef.current.on("connect_error", (err) => handleErrors(err))
    //         // socketRef.current.on("connect_failed", (err) => handleErrors(err))

    //         function handleErrors(err) {
    //             console.log("Socket error", err);
    //             toast.error("Socket Connection failed try again later.");
    //             reactNavigator("/")
    //         }
    //     }
    //     init();
    //     return () => {
    //         // socketRef.current.disconnect();
    //         document.removeEventListener("keydown", toggleTerminal)
    //     }
    // }, [])

    const toggleTerminal = (event) => {
        let classList = document.getElementById("terminal").classList
        if (event.altKey && event.key == 'o') {
            console.log("invisible");
            if (classList.contains("invisible")) {
                classList.remove("invisible");
            } else {
                classList.add("invisible");
            }
        }
    }



    return (
        <>
            <div className='h-screen overflow-hidden w-full'>
                <div className="mx-auto bg-[#3A424D] h-[100vh] flex flex-col box-border">
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    <div className='flex h-[100%]'>
                        <Sidebar changeMode={switcher} />
                        <div className='flex flex-col box-border w-[80%] '>
                            <div className="flex justify-center flex-col">
                                {
                                    whiteboard ? <Whiteboard /> : <CodeEditor handleSubmit={handleSubmit} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Terminal />
            </div>

            {/* output */}

        </>
    )
}

export default IDE