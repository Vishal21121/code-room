import React, { useState, useEffect } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";
import { useSelector } from "react-redux"
import ACTIONS from '../util/Actions';
import { useParams } from 'react-router-dom';

const Whiteboard = () => {
    const [excalidrawApi, setExcalidrawApi] = useState(null)
    const socketio = useSelector((state) => state.socket.socket)
    const { roomId } = useParams()
    const [viewMode, setViewMode] = useState(true)
    const userData = useSelector((state) => state.userData.userData)
    const userName = userData.data.loggedInUser.username
    console.log(userName);

    // TODO: make a permission switcher in the People section so that onClicking the user logo permission can be trasnfered.
    const viewModeSetter = () => {
        if (userName === "one") {
            setViewMode(false)
        }
    }

    const handleChange = () => {
        console.log("triggered");
        const elements = excalidrawApi?.getSceneElements()
        socketio.emit(ACTIONS.BOARD_CHANGE, { roomId, elements })
        if (elements.length > 0) {
            localStorage.setItem("Elements", JSON.stringify(elements))
        }
    };

    useEffect(() => {
        if (!excalidrawApi) {
            return;
        }
        viewModeSetter()
        excalidrawApi.readyPromise.then((api) => {
            console.log({ api });
            const storedElements = JSON.parse(localStorage.getItem("Elements"));
            console.log({ storedElements });
            if (storedElements) {
                setTimeout(() => {
                    api.updateScene({ elements: storedElements });
                }, 0)
                console.log("updated");
            }
            socketio.on(ACTIONS.BOARD_CHANGE, ({ elements }) => {
                if (userName != "one") {
                    api.updateScene({ elements: elements });
                }
            })
        });
        return () => {
            socketio.off(ACTIONS.BOARD_CHANGE)
        }
    }, [excalidrawApi])
    return (
        <div className='h-full w-full'>
            <Excalidraw
                ref={api => setExcalidrawApi(api)}
                onChange={handleChange}
                viewModeEnabled={viewMode}
            >
            </Excalidraw>
        </div>
    )
}

export default Whiteboard