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
    })
})

export const {
    useListAdminsQuery
} = listAdminsApi