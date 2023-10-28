import apiSlice from "../api.slice";

const createAccountApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createAdmin: builder.mutation({
            query: (data) => ({
                url: 'api/admin/',
                method: 'POST',
                body: data
            })
        }),
        createTeacher: builder.mutation({
            query: (data) => ({
                url: 'api/teacher/',
                method: 'POST',
                body: data
            })
        }),
        createStudent: builder.mutation({
            query: (data) => ({
                url: 'api/student/',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {
    useCreateAdminMutation,
    useCreateTeacherMutation,
    useCreateStudentMutation
} = createAccountApi