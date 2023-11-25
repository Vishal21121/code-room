import { apiSlice } from "../../app/api/apiSlice";

export const botApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        askBot: builder.mutation({
            query: (data) => ({
                url: "/room-features/chat-bot",
                method: "POST",
                body: { ...data }
            })
        })
    })
})

// if it's a mutation, it will end with "Mutation" and if it's a query, it will end with "Query"
export const {
    useAskBotMutation
} = botApiSlice