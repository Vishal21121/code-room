import { apiSlice } from "../../app/api/apiSlice";

export const editorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCode: builder.query({
      query: ({ roomId }) => `/room/get-code?roomId=${roomId}`,
      keepUnusedDataFor: 5,
    }),
    updateCode: builder.mutation({
      query: (data) => ({
        url: "/room/update-code",
        method: "PATCH",
        body: { ...data },
      }),
    }),
    createFolder: builder.mutation({
      query: (data) => ({
        url: "/room/create-room-folder",
        method: "POST",
        body: { ...data },
      }),
    }),
    getFiles: builder.query({
      query: ({ roomName, path, isFolder }) =>
        `/room/get-room-files?roomName=${roomName}&path=${path}&isFolder=${isFolder}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

// if it's a mutation, it will end with "Mutation" and if it's a query, it will end with "Query"
export const {
  useLazyGetCodeQuery,
  useUpdateCodeMutation,
  useCreateFolderMutation,
  useLazyGetFilesQuery,
} = editorApiSlice;
