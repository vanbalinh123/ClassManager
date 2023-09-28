import apiSlice from "./api.slice";

const userApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        user: builder.query({
            query: () => 'api/user'
        })
    })
})

export const {
    useUserQuery
} = userApi
