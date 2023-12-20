import apiSlice from "../api.slice";

const deleteAccountApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        deleteAdmin: builder.mutation({
            query: (usercode) => ({
                url: `api/admin/${usercode}/`,
                method: 'DELETE',
            })
        }),
        deleteTeacher: builder.mutation({
            query: (usercode) => ({
                url: `api/teacher/${usercode}/`,
                method: 'DELETE',
            })
        }),
        deleteStudent: builder.mutation({
            query: (usercode) => ({
                url: `api/student/${usercode}/`,
                method: 'DELETE',
            })
        }),
        deleteParent: builder.mutation({
            query: (usercode) => ({
                url: `api/parent/${usercode}/`,
                method: 'DELETE',
            })
        }),
    })
});

export const {
    useDeleteAdminMutation,
    useDeleteTeacherMutation,
    useDeleteStudentMutation,
    useDeleteParentMutation
} = deleteAccountApi