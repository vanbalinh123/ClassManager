import apiSlice from "../api.slice";

const classApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createClass: builder.mutation({
            query: (data) => ({
                url: 'api/class/',
                method: 'POST',
                body: data
            })
        }),
        listClass: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: (data) => ({
                url: '/api/class/',
                params: data
            }),
        }),
    })
})

export const {
    useCreateClassMutation,
    useListClassQuery
} = classApi