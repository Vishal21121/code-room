import { apiSlice } from "../../app/api/apiSlice";

export const boardApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateBoardContent: builder.mutation({
            query: credentials => ({
                url: "/room-features/update-board",
                method: "PATCH",
                body: { ...credentials }
            })
        }),
        getContent: builder.query({
            query: ({ roomId }) => `/room-features/get-content?roomId=${roomId}`,
            keepUnusedDataFor: 5
        }),
    })
})

// if it's a mutation, it will end with "Mutation" and if it's a query, it will end with "Query"
export const {
    useLazyGetContentQuery,
    useUpdateBoardContentMutation
} = boardApiSlice