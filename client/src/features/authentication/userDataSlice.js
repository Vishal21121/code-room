import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {},
    accessToken: ""
}

export const refreshTokens = createAsyncThunk("token/refreshToken", async () => {
    const response = await fetch("http://localhost:8080/api/v1/users/refreshToken", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = response.json()
    return data
})

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
    },
    extraReducers(builder) {
        builder.addCase(refreshTokens.fulfilled, (state, action) => {
            state.accessToken = action.payload.data.accessToken;
        })
    }
})

export const { setUserData, setAccessToken } = userDataSlice.actions
export default userDataSlice.reducer