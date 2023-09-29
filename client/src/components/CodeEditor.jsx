import React, { useState, useRef, useEffect } from 'react'
import "monaco-themes/themes/Monokai Bright.json";
import Editor, { loader } from '@monaco-editor/react';
import { Play } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import ACTIONS from '../util/Actions';
import { useParams } from 'react-router-dom';


const CodeEditor = ({ handleSubmit }) => {
    const socketio = useSelector((state) => state.socket.socket)
    const { roomId } = useParams()
    const editorRef = useRef(null);
    const [code, setCode] = useState("")
    const handleEditorDidMount = (editor) => {
        editorRef.current = editor
        import('monaco-themes/themes/Dracula.json')
            .then(data => {
                monaco.editor.defineTheme('dracula', data);
            })
            .then(_ => monaco.editor.setTheme('dracula'))
    }

    function handleEditorValidation(markers) {
        // model markers
        markers.forEach((marker) => console.log('onValidate:', marker.message));
    }

    const handleChange = () => {
        socketio.emit(ACTIONS.CODE_CHANGE, { code: editorRef.current.getValue(), roomId })
    }

    useEffect(() => {
        console.log({ socketio });
        if (socketio) {
            socketio.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                // console.log(code);
                console.log(editorRef.current);
                setCode(code)
            })
        }
        return () => {
            socketio?.off(ACTIONS.CODE_CHANGE)
        }
    }, [socketio])

    return (
        <div className='flex-col'>
            <div className='flex bg-[#161a2a] h-12'>
                <Play className='absolute right-10 my-[11px] text-white cursor-pointer' onClick={async (e) => { await handleSubmit(e, editorRef.current.getValue()) }} />
            </div>
            <Editor
                height="100vh"
                value={code}
                defaultLanguage="javascript"
                onValidate={handleEditorValidation}
                onMount={handleEditorDidMount}
                onChange={handleChange}
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