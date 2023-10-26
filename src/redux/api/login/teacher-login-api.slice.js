import apiSlice from "../api.slice";

const loginApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        loginTeacher: builder.mutation({
            query: (data) => ({
                url: 'api/teacher-login',
                method: 'POST',
                body: data
            })
        }),
        loginAdmin: builder.mutation({
            query: (data) => ({
                url: 'api/admin-login',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {
    useLoginTeacherMutation,
    useLoginAdminMutation
} = loginApi
