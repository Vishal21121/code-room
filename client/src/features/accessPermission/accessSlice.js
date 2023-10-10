import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // set this after taking the value from database
    access: ""
}

export const accessSlice = createSlice({
    name: "access",
    initialState,
    reducers: {
        setAccess: (state, action) => {
            state.access = action.payload
        }
    }
})

export const { setAccess } = accessSlice.actions
export default accessSlice.reducer