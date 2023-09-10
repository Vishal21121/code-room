import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clients: []
}

export const clientSice = createSlice({
    name: "client",
    initialState,
    reducers: {
        setClient: (state, action) => {
            state.clients = action.payload
        }
    }
})

export const { setClient } = clientSice.actions
export default clientSice.reducer