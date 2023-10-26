import apiSlice from "./api.slice";

const createAccountApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        creatAccount: builder.mutation({
            query: (data) => ({
                url: 'api/admin/',
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useCreatAccountMutation
} = createAccountApi