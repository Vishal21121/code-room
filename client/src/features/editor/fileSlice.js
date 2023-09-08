import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    file: ""
}

export const fileSlice = createSlice({
    name: "currentFile",
    initialState,
    reducers: {
        setFile: (state, action) => {
            state.file = action.payload
        }
    }
})

export const { setFile } = fileSlice.actions
export default fileSlice.reducer