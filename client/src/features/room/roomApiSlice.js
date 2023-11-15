import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRooms: builder.query({
            query: (userName) => `/room/get-rooms?username=${userName}`,
            keepUnusedDataFor: 5
        }),
    })
})

// if it's a mutation, it will end with "Mutation" and if it's a query, it will end with "Query"
export const {
    useGetRoomsQuery
} = authApiSlice