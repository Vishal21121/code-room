import { apiSlice } from "../../app/api/apiSlice";

export const accessApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateAdmin: builder.mutation({
            query: credentials => ({
                url: "/room/update-admin",
                method: "PATCH",
                body: { ...credentials }
            })
        }),
    })
})

// if it's a mutation, it will end with "Mutation" and if it's a query, it will end with "Query"
export const {
    useUpdateAdminMutation
} = accessApiSlice