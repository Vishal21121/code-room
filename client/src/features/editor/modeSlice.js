import { createSlice } from "@reduxjs/toolkit";
import modes from "../../util/Mode";

const initialState = {
    mode: modes["CODE-EDITOR"]
}

export const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload
        }
    }
})

export const { setMode } = modeSlice.actions
export default modeSlice.reducer