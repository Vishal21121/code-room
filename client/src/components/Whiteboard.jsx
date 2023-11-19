import React, { useState, useEffect } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";
import { useDispatch, useSelector } from "react-redux"
import ACTIONS from '../util/Actions';
import { useParams } from 'react-router-dom';
import { setAccess } from '../features/accessPermission/accessSlice';
import { useDebouncedCallback } from 'use-debounce';
import { refreshTokens } from '../features/authentication/userDataSlice';
import { useLazyGetContentQuery, useUpdateBoardContentMutation } from '../features/whiteboard/boardApiSlice';

const Whiteboard = () => {
    const [excalidrawApi, setExcalidrawApi] = useState(null)
    const socketio = useSelector((state) => state.socket.socket)
    const { roomId } = useParams()
    const [viewMode, setViewMode] = useState(true)
    const userData = useSelector((state) => state.userData.userData)
    const userName = userData.data.loggedInUser.username
    const accessedUser = useSelector((state) => state.access.access)
    const accessToken = useSelector((state) => state.userData.accessToken)
    const dispatch = useDispatch()
    const [getContent] = useLazyGetContentQuery()
    const [updateBoardContent] = useUpdateBoardContentMutation()

    const viewModeSetter = () => {
        if (userName === accessedUser) {
            setViewMode(false)
        } else {
            setViewMode(true)
        }
    }

    const sendContent = async (content, retry = true) => {
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
        if (data.data.statusCode === 401 && retry) {
            dispatch(refreshTokens())
            return await sendContent(content, retry = false)
        }
    }

    const debouncedSendContent = useDebouncedCallback(sendContent, 500);

    const handleChange = () => {
        const elements = excalidrawApi?.getSceneElements()
        if (userName === accessedUser) {
            socketio.emit(ACTIONS.BOARD_CHANGE, { roomId, elements })
            debouncedSendContent(elements)
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

        excalidrawApi.readyPromise.then((api) => {
            fetchContent(api)
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