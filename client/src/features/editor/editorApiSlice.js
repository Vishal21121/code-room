import { apiSlice } from "../../app/api/apiSlice";

export const editorApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCode: builder.query({
            query: ({ roomId }) => `/room/get-code?roomId=${roomId}`,
            keepUnusedDataFor: 5
        }),
        updateCode: builder.mutation({
            query: (data) => ({
                url: "/room/update-code",
                method: "PATCH",
                body: { ...data }
            })
        })
    })
})

// if it's a mutation, it will end with "Mutation" and if it's a query, it will end with "Query"
export const {
    useLazyGetCodeQuery,
    useUpdateCodeMutation
} = editorApiSlice