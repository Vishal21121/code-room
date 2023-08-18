import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Terminal from '../components/Terminal';
import Whiteboard from '../components/Whiteboard';
import CodeEditor from '../components/CodeEditor';


const Home = () => {
    const navigate = useNavigate()
    const [output, setOutput] = useState("")
    const [whiteboard, setWhiteboard] = useState(false)
    const [currentFile, setCurrentFile] = useState("")

    const handleSubmit = async (e) => {
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


    useEffect(() => {
        document.addEventListener("keydown", toggleTerminal)
        return () => {
            document.removeEventListener("keydown", toggleTerminal)
        }
    }, [])

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

    const fileClicked = (fileVal)=>{
        setCurrentFile(fileVal)
    }


    return (
        <>
            <div className='h-screen overflow-hidden'>
                <div className="mx-auto bg-[#3A424D] h-[100vh] flex flex-col box-border">
                    {/* <button onClick={handleSubmit} className='p-2 w-fit bg-orange-600 rounded-lg text-sm text-white font-semibold relative left-[60vw] z-10 mb-4 '>Submit</button> */}
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    <div className='flex h-[100%]'>
                        <Sidebar changeMode={switcher} fileNameGet={fileClicked} />
                        <div className='flex flex-col box-border w-3/4 '>
                            <div className="flex justify-center flex-col">
                                {
                                    whiteboard ? <Whiteboard /> : <CodeEditor fileClicked={currentFile} />
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

export default Home