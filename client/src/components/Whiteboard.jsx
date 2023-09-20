import React, { useState, useEffect } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";

const Whiteboard = () => {
    const [excalidrawApi, setExcalidrawApi] = useState(null)

    const handlePointerUpdate = () => {
        if (excalidrawApi) {
            const elements = excalidrawApi.getSceneElements()
            if (elements.length > 0) {
                localStorage.setItem("Elements", JSON.stringify(elements))
            }
        }
    };

    useEffect(() => {
        if (!excalidrawApi) {
            return;
        }
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
        });
    }, [excalidrawApi])
    return (
        <div className='h-full w-full'>
            <Excalidraw
                ref={api => setExcalidrawApi(api)}
                onPointerUpdate={handlePointerUpdate}
            >
            </Excalidraw>
        </div>
    )
}

export default Whiteboard