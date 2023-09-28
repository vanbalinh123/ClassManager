import apiSlice from "./api.slice";

const loginApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (data) => ({
                url: 'api/login',
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useLoginMutation
} = loginApi
