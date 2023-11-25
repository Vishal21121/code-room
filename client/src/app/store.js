import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "../features/mode/modeSlice"
import userDataReducer from "../features/authentication/userDataSlice"
import socketReducer from "../features/sockets/socketSlice"
import clientReducer from "../features/clients/clientSlice"
import accessReducer from "../features/accessPermission/accessSlice"
import problemReducer from "../features/editor/problemSlice"
import roomReducer from "../features/room/roomSlice"
import { apiSlice } from "./api/apiSlice";
import notesReducer from "../features/notes/notesSlice";
import botReducer from "../features/chat-bot/botSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        mode: modeReducer,
        userData: userDataReducer,
        socket: socketReducer,
        client: clientReducer,
        access: accessReducer,
        problems: problemReducer,
        room: roomReducer,
        notes: notesReducer,
        bot: botReducer
    },
    // for redux toolkit query to cache our query
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    // devTools should be false in production
    devTools: true
})

export default store