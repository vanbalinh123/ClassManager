import apiSlice from "../api.slice";

const listStudentsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        listStudents: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: (data) => ({
                url: '/api/student/',
                params: data
            }),
        }),
        detailStudent: builder.query({
            query: (usercode) => ({
                url: `/api/student/${usercode}/`,
                // params: data
            }),
        }),
    })
})

export const {
    useListStudentsQuery,
    useDetailStudentQuery
} = listStudentsApi