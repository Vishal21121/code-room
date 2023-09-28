import React, { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';
import { initSocket } from '../util/socket';


const IDE = () => {
    const navigate = useNavigate()
    const [output, setOutput] = useState("")
    // shift this state in store
    const socketRef = useRef(null);

    const handleSubmit = async (e, code) => {
        console.log("called", code)
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
        } else if (data.run.stderr) {
            setOutput(data.run.stderr)
            toast.error("error in the code")
        } else {
            toast.success("Code compiled")
            setOutput("Nothing to print")
        }
    }

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

    useEffect(() => {
        document.addEventListener("keydown", toggleTerminal)
        return () => {
            document.removeEventListener("keydown", toggleTerminal)
        }
    }, [])


    return (
        <>
            <div className='h-screen overflow-hidden w-full'>
                <div className="mx-auto bg-[#3A424D] h-[100vh] flex flex-col box-border">
                    <div className='flex h-[100%]'>
                        <div className='flex flex-col box-border w-[100%] '>
                            <div className="flex justify-center flex-col">
                                <CodeEditor handleSubmit={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
                <Terminal output={output} />
            </div>

        </>
    )
}

export default IDE