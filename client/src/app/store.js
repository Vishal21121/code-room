import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { apiSlice } from "./api/apiSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        reducer
    },
    // for redux toolkit query to cache our query
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    // devTools should be false in production
    devTools: true
})

export default store