import React, { useState, useRef, useEffect } from 'react'
import "monaco-themes/themes/Monokai Bright.json";
import Editor, { loader } from '@monaco-editor/react';


const CodeEditor = ({ fileClicked }) => {
    // const [code, setCode] = useState([])
    const [currentFile, setCurrentFile] = useState("")
    const [fileDetails, setfileDetails] = useState([{
        filename: "",
        language: "",
        value: ""
    }])
    const [currentFileDetails, setCurrentFileDetails] = useState({
        filename:"",
        language:"",
        value:""
    })
    const [buttonArr, setButtonArr] = useState([])
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor
        import('monaco-themes/themes/Dracula.json')
            .then(data => {
                monaco.editor.defineTheme('dracula', data);
            })
            .then(_ => monaco.editor.setTheme('dracula'))
    }

    const getContent = () => {
        let language
        if (currentFile.split(".").includes("js")) {
            language = "javascript"
        } else if (currentFile.split(".").includes("css")) {
            language = "css"
        } else if (currentFile.split(".").includes("js")) {
            language = "html"
        }
        console.log(editorRef.current.getValue());
        setfileDetails(prev => [...prev, {
            filename: currentFile, language, value: editorRef.current.getValue()
        }])
    }

    function handleEditorValidation(markers) {
        // model markers
        markers.forEach((marker) => console.log('onValidate:', marker.message));
    }

    const currentFileContentSetter = (file)=>{
        let language;
        if (file.split(".").includes("js")) {
            language = "javascript"
        } else if (file.split(".").includes("css")) {
            language = "css"
        } else if (file.split(".").includes("html")) {
            language = "html"
        }
        let fileVal = fileDetails.find(el => el.filename === file)
        let codeVal = ""
        if(fileVal){
            codeVal = fileVal.value
        }
        console.log(codeVal);
        setCurrentFileDetails({ filename: file, language, value: codeVal })
    }

    useEffect(() => {
        currentFileContentSetter(fileClicked)
        if (!buttonArr.includes(fileClicked)) {
            setButtonArr([...buttonArr, fileClicked])
            console.log(buttonArr);
        }
    }, [fileClicked])

    const handleClickOnTab = (file)=>{
        console.log(file);
        setCurrentFile(file)
        currentFileContentSetter(file)
    }


    return (
        <div className='flex-col gap-4'>
            <div className='flex bg-[#21252b]'>
                {
                    buttonArr?.map((el) => (
                        el ? (<button onClick={(e) => handleClickOnTab(e.currentTarget.innerText)} className={`py-2 px-6 ${el===currentFileDetails.filename ? "border-b border-l border-r":''} border-[#44475a] bg-[#21252b] text-white`}>{el}</button>) : ""
                    ))
                }
            </div>
            <Editor
                height="94vh"
                path={currentFileDetails.filename}
                defaultLanguage={currentFileDetails.language}
                defaultValue={currentFileDetails.value}
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
    )
}

export default CodeEditor