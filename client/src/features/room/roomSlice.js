import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    room: {}
}

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoom: (state, action) => {
            state.room = action.payload
        }
    }
})

export const { setRoom } = roomSlice.actions
export default roomSlice.reducer