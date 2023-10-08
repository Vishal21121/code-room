import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {},
    accessToken: ""
}

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        }
    }
})

export const { setUserData, setAccessToken } = userDataSlice.actions
export default userDataSlice.reducer