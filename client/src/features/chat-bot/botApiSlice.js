import { apiSlice } from "../../app/api/apiSlice";

export const botApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        askBot: builder.mutation({
            query: (data) => ({
                url: "/room-features/chat-bot",
                method: "POST",
                body: { ...data }
            })
        }),
        createChatContainer: builder.mutation({
            query: (data) => ({
                url: "/room-features/create-chatContainer",
                method: "POST",
                body: { ...data }
            })
        }),
        createChat: builder.mutation({
            query: (data) => ({
                url: "/room-features/create-chat",
                method: "POST",
                body: { ...data }
            })
        }),
        getChatContainer: builder.query({
            query: ({ roomId }) => `/room-features/get-chatContainer?roomId=${roomId}`,
            keepUnusedDataFor: 5
        }),
        getChats: builder.query({
            query: ({ containerId }) => `/room-features/get-chats?chatContainerId=${containerId}`,
            keepUnusedDataFor: 5
        }),
    })
})

// if it's a mutation, it will end with "Mutation" and if it's a query, it will end with "Query"
export const {
    useAskBotMutation,
    useCreateChatContainerMutation,
    useCreateChatMutation,
    useLazyGetChatContainerQuery,
    useLazyGetChatsQuery
} = botApiSlice