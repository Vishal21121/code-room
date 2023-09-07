import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "../features/editor/modeSlice"

export const store = configureStore({
    reducer: modeReducer
})