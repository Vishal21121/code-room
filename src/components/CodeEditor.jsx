import React, { useState, useRef, useEffect } from 'react'
import "monaco-themes/themes/Monokai Bright.json";
import Editor, { loader } from '@monaco-editor/react';
import files from "../utils/file"


const CodeEditor = () => {
    const [code, setCode] = useState("")
    const [fileName, setFileName] = useState();

    // const file = files[fileName];
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
        console.log(editorRef.current.getValue());
        setCode(editorRef.current.getValue())
    }

    function handleEditorValidation(markers) {
        // model markers
        markers.forEach((marker) => console.log('onValidate:', marker.message));
    }


    return (
        <div className='flex-col gap-4'>
            <div className='flex bg-[#21252b]'>
                <button disabled={fileName === 'script.js'} className='py-2 px-6 border-b bg-[#21252b] text-white' onClick={() => setFileName('script.js')}>
                    script.js
                </button>
                <button disabled={fileName === 'style.css'} className='py-2 px-6 bg-[#21252b] text-white' onClick={() => setFileName('style.css')}>
                    style.css
                </button>
                <button disabled={fileName === 'index.html'} className='py-2 px-6 bg-[#21252b] text-white' onClick={() => setFileName('index.html')}>
                    index.html
                </button>
            </div>
            <Editor
                height="94vh"
                // path={file.name}
                // defaultLanguage={file.language}
                defaultLanguage="Javascript"
                // defaultValue={file.value}
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