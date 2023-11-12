import apiSlice from "../api.slice";

const listAdminsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        listAdmins: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: (data) => ({
                url: '/api/admin/',
                params: data
            }),
        }),
        listTeachers: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: (data) => ({
                url: '/api/teacher/',
                params: data
            }),
        }),
        listStudents: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: (data) => ({
                url: '/api/student/',
                params: data
            }),
        }),
    })
})

export const {
    useListAdminsQuery,
    useListTeachersQuery,
    useListStudentsQuery
} = listAdminsApi