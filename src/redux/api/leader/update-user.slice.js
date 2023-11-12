import apiSlice from "../api.slice";

const updateUserApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateAdmin: builder.mutation({
            query: ({full_name, email, password, mobile, role, usercode}) => ({
                url: `/api/admin/${usercode}/`,
                method: 'PUT',
                body: {full_name, email, password, mobile, role, usercode}
            }),
        }),
        updateTeacher: builder.mutation({
            query: ({full_name, email, password, mobile, role, usercode}) => ({
                url: `/api/teacher/${usercode}/`,
                method: 'PUT',
                body: {full_name, email, password, mobile, role, usercode}
            }),
        }),
        updateStudent: builder.mutation({
            query: ({full_name, email, password, mobile, role, usercode}) => ({
                url: `/api/student/${usercode}/`,
                method: 'PUT',
                body: {full_name, email, password, mobile, role, usercode}
            }),
        }),
    })
})

export const {
    useUpdateAdminMutation,
    useUpdateTeacherMutation,
    useUpdateStudentMutation
} = updateUserApi