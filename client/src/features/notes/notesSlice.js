import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notesMode: "notes"
}

export const notesSlice = createSlice({
    name: "notesMode",
    initialState,
    reducers: {
        setNotesMode: (state, action) => {
            state.notesMode = action.payload
        }
    }
})

export const { setNotesMode } = notesSlice.actions
export default notesSlice.reducer