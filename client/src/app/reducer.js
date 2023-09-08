import { combineReducers } from "@reduxjs/toolkit";
import modeReducer from "../features/mode/modeSlice"
import fileReducer from "../features/editor/fileSlice"

export default combineReducers({
    mode: modeReducer,
    currentFile: fileReducer
})