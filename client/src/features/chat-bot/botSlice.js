import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatContainer: null, // this will be set to the id of the chatContainer
    chats: []
}

export const botSlice = createSlice({
    name: "bot",
    initialState,
    reducers: {
        setChatContainer: (state, action) => {
            state.chatContainer = action.payload
        },
        setChats: (state, action) => {
            state.chats = action.payload
        },
    }
})

export const { setChatContainer, setChats } = botSlice.actions
export default botSlice.reducer