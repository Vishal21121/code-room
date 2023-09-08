import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "../features/mode/modeSlice"

export const store = configureStore({
    reducer: modeReducer
})