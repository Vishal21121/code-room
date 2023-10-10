import { combineReducers } from "@reduxjs/toolkit";
import modeReducer from "../features/mode/modeSlice"
import fileReducer from "../features/editor/fileSlice"
import userDataReducer from "../features/authentication/userDataSlice"
import socketReducer from "../features/sockets/socketSlice"
import clientReducer from "../features/clients/clientSlice"
import accessReducer from "../features/accessPermission/accessSlice"
import problemReducer from "../features/editor/problemSlice"
import roomReducer from "../features/room/roomSlice"

export default combineReducers({
    mode: modeReducer,
    currentFile: fileReducer,
    userData: userDataReducer,
    socket: socketReducer,
    client: clientReducer,
    access: accessReducer,
    problems: problemReducer,
    room: roomReducer
})