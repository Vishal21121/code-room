import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    problems: []
}

export const problemSlice = createSlice({
    name: "problems",
    initialState,
    reducers: {
        setProblems: (state, action) => {
            state.problems = action.payload
        }
    }
})

export const { setProblems } = problemSlice.actions
export default problemSlice.reducer