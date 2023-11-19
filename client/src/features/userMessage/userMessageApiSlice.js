import { apiSlice } from "../../app/api/apiSlice";

export const userMessageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        sendMessage: builder.mutation({
            query: data => ({
                url: "/room-features/send-message",
                method: "POST",
                body: { ...data }
            })
        }),
        getMessage: builder.query({
            query: ({ roomId }) => `/room-features/get-message?roomId=${roomId}`,
            keepUnusedDataFor: 5
        }),
    })
})

// if it's a mutation, it will end with "Mutation" and if it's a query, it will end with "Query"
export const {
    useSendMessageMutation,
    useLazyGetMessageQuery
} = userMessageApiSlice