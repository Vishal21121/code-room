import React, { useState, useEffect } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";
import { useDispatch, useSelector } from "react-redux"
import ACTIONS from '../../util/Actions';
import { useParams } from 'react-router-dom';
import { setAccess } from '../../features/accessPermission/accessSlice';
import { useDebouncedCallback } from 'use-debounce';
import { refreshTokens } from '../../features/authentication/userDataSlice';
import { useLazyGetContentQuery, useUpdateBoardContentMutation } from '../../features/whiteboard/boardApiSlice';

const Whiteboard = () => {
    const [excalidrawApi, setExcalidrawApi] = useState(null)
    const socketio = useSelector((state) => state.socket.socket)
    const { roomId } = useParams()
    const [viewMode, setViewMode] = useState(true)
    const userData = useSelector((state) => state.userData.userData)
    const userName = userData.data.loggedInUser.username
    const accessedUser = useSelector((state) => state.access.access)
    const dispatch = useDispatch()
    const [getContent] = useLazyGetContentQuery()
    const [updateBoardContent] = useUpdateBoardContentMutation()
    const [previousElements, setPreviousElements] = useState(null);

    const viewModeSetter = () => {
        if (userName === accessedUser) {
            setViewMode(false)
        } else {
            setViewMode(true)
        }
    }

    const sendContent = async (content) => {
        const body = {
            roomId: roomId,
            content: JSON.stringify(content)
        }
        try {
            const response = await updateBoardContent(body).unwrap()
            console.log({ response });
        } catch (error) {
            console.log(error);
        }
    }

    const debouncedSendContent = useDebouncedCallback(sendContent, 500);

    const handleChange = () => {
        const elements = excalidrawApi?.getSceneElements()
        if (userName === accessedUser && JSON.stringify(elements) !== JSON.stringify(previousElements)) {
            socketio.emit(ACTIONS.BOARD_CHANGE, { roomId, elements })
            debouncedSendContent(elements)
            setPreviousElements(elements); // update the previous elements
        }
    };

    const fetchContent = async (api) => {
        console.log("called");
        try {
            const dataSend = {
                roomId: roomId
            }
            const response = await getContent(dataSend).unwrap()
            console.log({ response });
            setTimeout(() => {
                api.updateScene({ elements: JSON.parse(response.data.value.content) })
            }, 0)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if (!excalidrawApi) {
            return;
        }
        viewModeSetter()
        console.log("called");
        excalidrawApi.readyPromise.then((api) => {
            fetchContent(api)
            socketio.on(ACTIONS.BOARD_CHANGE, ({ elements }) => {
                if (userName != accessedUser) {
                    console.log("inside the event");
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