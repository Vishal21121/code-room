import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notesMode: "notes",
    notes: null,
    noteId: null,
    editMode: false
}

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setNotesMode: (state, action) => {
            state.notesMode = action.payload
        },
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setNoteId: (state, action) => {
            state.noteId = action.payload
        },
        setEditMode: (state, action) => {
            state.editMode = action.payload
        }
    }
})

export const { setNotesMode, setNotes, setNoteId, setEditMode } = notesSlice.actions
export default notesSlice.reducer