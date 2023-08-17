import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Editor, { loader } from '@monaco-editor/react';
import { PenTool, Play, X } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import "monaco-themes/themes/Monokai Bright.json";
import Sidebar from './Sidebar';


const MonacoEditor = () => {
    const navigate = useNavigate()
    const [code, setCode] = useState("")
    const [output, setOutput] = useState("")

    const editorRef = useRef(null);
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

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor
        import('monaco-themes/themes/Dracula.json')
        .then(data => {
          monaco.editor.defineTheme('dracula', data);
        })
        .then(_ => monaco.editor.setTheme('dracula'))
    }

    const getContent = () => {
        console.log(editorRef.current.getValue());
        setCode(editorRef.current.getValue())
    }

    function handleEditorValidation(markers) {
        // model markers
        markers.forEach((marker) => console.log('onValidate:', marker.message));
    }

    const closeTerminal = (e) => {
        e.preventDefault()
        let classList = document.getElementById("terminal").classList
        classList.add("invisible")
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
                        <Sidebar/>
                        <div className='flex flex-col box-border w-3/4 '>
                            <div className="flex justify-center flex-col">
                                <Editor
                                    height="100vh"
                                    defaultLanguage="javascript"
                                    defaultValue="// Enter code"
                                    onValidate={handleEditorValidation}
                                    onMount={handleEditorDidMount}
                                    onChange={getContent}
                                    options={
                                        {
                                            "wordWrap": true,
                                            "codeLens": true,
                                            "dragAndDrop": false,
                                            "mouseWheelZoom": true
                                        }
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='box-border bg-[#2a2f38] p-4 relative bottom-72 flex flex-col w-[75%] ml-[25%] z-10 h-[40vh]' id='terminal'>
                    <div className='flex '>
                        <button className='text-white mx-4 focus:underline focus:underline-offset-8'>Problem</button>
                        <button className='text-white mx-4 underline underline-offset-8 focus:underline focus:underline-offset-8' id='termEl'>Terminal</button>
                        <X className='text-white absolute right-10 cursor-pointer' onClick={closeTerminal} />
                    </div>
                    <div className='text-gray-300 mt-4 mx-4'>{output}</div>
                </div>
            </div>

            {/* output */}

        </>
    )
}

export default MonacoEditor