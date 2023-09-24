import React, { useState, useEffect } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";
import { useDispatch, useSelector } from "react-redux"
import ACTIONS from '../util/Actions';
import { useParams } from 'react-router-dom';
import { setAccess } from '../features/accessPermission/accessSlice';

const Whiteboard = () => {
    const [excalidrawApi, setExcalidrawApi] = useState(null)
    const socketio = useSelector((state) => state.socket.socket)
    const { roomId } = useParams()
    const [viewMode, setViewMode] = useState(true)
    const userData = useSelector((state) => state.userData.userData)
    const userName = userData.data.loggedInUser.username
    const accessedUser = useSelector((state) => state.access.access)
    const dispatch = useDispatch()
    console.log(userName, accessedUser);

    // TODO: make a permission switcher in the People section so that onClicking the user logo permission can be trasnfered.
    const viewModeSetter = () => {
        console.log("accessedUser", accessedUser);
        if (userName === accessedUser) {
            setViewMode(false)
        } else {
            setViewMode(true)
        }
    }

    const handleChange = () => {
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
                if (userName != accessedUser) {
                    api.updateScene({ elements: elements });
                }
            })

            socketio.on(ACTIONS.PERMISSION_CHANGE, ({ changedPermissionUser }) => {
                console.log({ changedPermissionUser });
                dispatch(setAccess(changedPermissionUser))
                viewModeSetter()
            })
        });
        return () => {
            socketio.off(ACTIONS.BOARD_CHANGE)
            socketio.off(ACTIONS.PERMISSION_CHANGE)
        }
    }, [excalidrawApi, accessedUser])
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