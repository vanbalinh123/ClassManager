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
        loginStudent: builder.mutation({
            query: (data) => ({
                url: 'api/student-login',
                method: 'POST',
                body: data
            })
        }),
        loginParent: builder.mutation({
            query: (data) => ({
                url: 'api/parent_login',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {
    useLoginTeacherMutation,
    useLoginAdminMutation,
    useLoginStudentMutation,
    useLoginParentMutation
} = loginApi
