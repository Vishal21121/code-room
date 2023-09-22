import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clients: []
}

export const clientSice = createSlice({
    name: "client",
    initialState,
    reducers: {
        setClient: (state, action) => {
            console.log("payload", action.payload);
            const clientObj = action.payload;
            let arr = []
            clientObj.forEach(element => {
                arr.push(element["username"])
            });
            state.clients = arr
        },
        removeClient: (state, action) => {
            state.clients = state.clients.filter((el) => el != action.payload)
        }

    }
})

export const { setClient, removeClient } = clientSice.actions
export default clientSice.reducer