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
    })
})

export const {
    useListStudentsQuery
} = listStudentsApi