import apiSlice from "../api.slice";

const listTeachersApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        listTeachers: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: (data) => ({
                url: '/api/teacher/',
                params: data
            }),
        }),
    })
})

export const {
    useListTeachersQuery
} = listTeachersApi