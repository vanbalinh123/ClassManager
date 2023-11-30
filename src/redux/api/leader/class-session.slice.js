import apiSlice from "../api.slice";

const classSessionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listClassSession: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (data) => ({
        url: `/api/class-session/`,
        params: data
      }),
    }),
    postClassSession: builder.mutation({
      
    })
  })
})

export const {
  useListClassSessionQuery
} = classSessionApi;