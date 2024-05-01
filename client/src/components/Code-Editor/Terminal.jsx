import React, { useState, useRef, useEffect } from 'react'
import { X } from 'react-feather';
import { useSelector } from 'react-redux';
import { HiOutlineXCircle } from "react-icons/hi2";
import { Terminal as xtermTerminal } from "xterm"
import 'xterm/css/xterm.css';
import { WebLinksAddon } from '@xterm/addon-web-links';



const Terminal = ({ output }) => {
  const problems = useSelector((state) => state.problems.problems)
  const [outputShow, setOutputShow] = useState(true)
  const terminalEl = useRef(null)
  const terminalInstance = useRef(null)
  const socketio = useSelector((state) => state.socket.socket)
  const terminalStarted = useRef(false)

  const closeTerminal = (e) => {
    e.preventDefault()
    let classList = document.getElementById("terminal").classList
    classList.add("invisible")
  }

  const terminalSetup = () => {
    terminalInstance.current = new xtermTerminal({
      // convertEol: true,
      theme: {
        background: "#44475c"
      },
    });
    terminalInstance.current.loadAddon(new WebLinksAddon());
    console.log({ terminalInstance: terminalInstance.current });
    terminalInstance.current.open(terminalEl.current)
  }

  useEffect(() => {
    let onKeyHandler
    if(!terminalStarted.current){
      terminalSetup()
      console.log("rendered")
      terminalStarted.current = true
      onKeyHandler = terminalInstance.current.onKey((e)=>{
        console.log("first",e.key)
        if (e.key === '\r') {
          terminalInstance.current.write('\n');
        }else{
          terminalInstance.current.write(e.key)
        }
      })
    }
    terminalInstance.current.focus()

    terminalInstance.current.onData((data)=>{
      socketio.emit("data",data)
    })
    
    socketio?.on("data", (data) => {
      if (terminalInstance.current) {
        let decoder = new TextDecoder();
        let encodedData = decoder.decode(new Uint8Array(data));
        terminalInstance.current.write(encodedData);
        console.log("encodedData", encodedData)
      } else {
        console.error('Terminal instance is not initialized');
      }
    })
    return ()=>{
      onKeyHandler?.dispose()
    }
  }, [socketio])


  return (
    // <div className='box-border bg-[#161a2a] p-4 relative bottom-72 flex flex-col w-[100%] z-10 h-[40vh]' id='terminal' ref={terminalEl}>
    //    <div className='flex '>
    //     <button className={`text-white mx-4 ${!outputShow ? "underline underline-offset-8" : ""}`} onClick={() => setOutputShow(false)}>Problem</button>
    //     <button className={`text-white mx-4 ${outputShow ? "underline underline-offset-8" : ""}`} id='termEl' onClick={() => setOutputShow(true)}>Terminal</button>
    //     <X className='text-white absolute right-10 cursor-pointer' onClick={closeTerminal} />
    //   </div> 
    //    {
    //     !outputShow ? (
    //       <div className='flex flex-col mt-4 mx-4 gap-1 overflow-auto'>
    //         {
    //           problems.map((el) => (
    //             <div className='flex gap-1'>
    //               <HiOutlineXCircle size={24} className='text-red-500' />
    //               <p className='text-gray-300'>{el}</p>
    //             </div>
    //           ))
    //         }
    //       </div>
    //     ) : <pre className='text-gray-300 mt-4 mx-4 overflow-auto'>{output}</pre>
    //   } 
    // </div>
    <div
      className="box-border bg-[#2D3032] p-4 relative bottom-72 flex flex-col w-[100%] z-10 h-[40vh] terminal overflow-auto shrink-0" 
      ref={terminalEl}
      id="terminal"
    >
    </div>
  )
}

export default Terminal