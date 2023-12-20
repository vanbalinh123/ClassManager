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
    classSession: builder.query({
      query: (id) => ({
        url: `/api/class-session/${id}/`,
        // params: id
      }),
    }),
    updateClassSession: builder.mutation({
      query: ( data ) => ({
        url: `api/class-session/${data.id}/`,
        method: "PUT",
        body: data
      }),
    })
  })
})

export const {
  useListClassSessionQuery,
  useClassSessionQuery,
  useUpdateClassSessionMutation
} = classSessionApi;