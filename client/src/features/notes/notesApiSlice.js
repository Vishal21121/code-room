import { apiSlice } from "../../app/api/apiSlice";

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createNotes: builder.mutation({
            query: (data) => ({
                url: "/room-features/create-notes",
                method: "POST",
                body: { ...data }
            }),
        }),
        getAllNotes: builder.query({
            query: ({ roomId }) => `room-features/get-notes?roomId=${roomId}`,
            keepUnusedDataFor: 5
        }),
        deletNotes: builder.mutation({
            query: (data) => ({
                url: "/room-features/delete-notes",
                method: "DELETE",
                body: { ...data }
            }),
        }),
        updateNotes: builder.mutation({
            query: (data) => ({
                url: "/room-features/update-notes",
                method: "PATCH",
                body: { ...data }
            }),
        })
    })
})

export const {
    useCreateNotesMutation,
    useLazyGetAllNotesQuery,
    useDeletNotesMutation,
    useUpdateNotesMutation
} = notesApiSlice