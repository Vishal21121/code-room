import React, { useState, useRef, useEffect } from 'react'
import { X } from 'react-feather';
import { useSelector } from 'react-redux';
import { HiOutlineXCircle } from "react-icons/hi2";
import { Terminal as xtermTerminal } from "xterm"
import 'xterm/css/xterm.css';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { FitAddon } from 'xterm-addon-fit';




const Terminal = ({ output }) => {
  const problems = useSelector((state) => state.problems.problems)
  const [outputShow, setOutputShow] = useState(true)
  const terminalEl = useRef(null)
  const terminalInstance = useRef(null)
  const socketio = useSelector((state) => state.socket.socket)
  const terminalStarted = useRef(false)
  const fitAddon = new FitAddon();

  const closeTerminal = (e) => {
    e.preventDefault()
    let classList = document.getElementById("terminal").classList
    classList.add("invisible")
  }

  const terminalSetup = () => {
    terminalInstance.current = new xtermTerminal({
      // convertEol: true,
      theme: {
        background: "#161a2a"
      },
    });
    terminalInstance.current.loadAddon(new WebLinksAddon());
    terminalInstance.current.loadAddon(fitAddon);
    console.log({ terminalInstance: terminalInstance.current });
    terminalInstance.current.open(terminalEl.current)
    const resizeObserver = new ResizeObserver(() => {
      fitAddon.fit();
    });
    resizeObserver.observe(document.querySelector('.terminal'));
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
      window.addEventListener('resize', () => {
        fitAddon.fit();
      });
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
    <div className='bg-[#161a2a] pl-4 relative bottom-[280px] left-[364px] flex flex-col w-1/2 z-50 h-[40vh] terminal' id='terminal' ref={terminalEl}>
    </div>
  )
}

export default Terminal