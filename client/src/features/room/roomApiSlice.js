import { apiSlice } from "../../app/api/apiSlice";

export const roomApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRooms: builder.query({
            query: (userName) => `/room/get-rooms?username=${userName}`,
            keepUnusedDataFor: 5
        }),
        addBoards: builder.mutation({
            query: (data) => ({
                url: "room-features/add-board",
                method: "POST",
                body: { ...data }
            })
        }),
        createRoom: builder.mutation({
            query: (data) => ({
                url: "room/create-room",
                method: "POST",
                body: { ...data }
            })
        }),
        joinRoom: builder.mutation({
            query: (data) => ({
                url: "room/join-room",
                method: "POST",
                body: { ...data }
            })
        })
    })
})

export const {
    useGetRoomsQuery,
    useAddBoardsMutation,
    useCreateRoomMutation,
    useJoinRoomMutation
} = roomApiSlice