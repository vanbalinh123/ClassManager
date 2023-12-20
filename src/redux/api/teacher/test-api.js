import apiSlice from "../api.slice";

const testApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listTests: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (data) => ({
        url: "/api/test/",
        params: data,
      }),
    }),
    detailTest: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (id) => ({
        url: `/api/test/${id}/`,
        // params: data,
      }),
    }),
    createTest: builder.mutation({
      query: (data) => ({
        url: `/api/test/`,
        method: 'POST',
        body: data
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const action = apiSlice.util.updateQueryData(
          "listTests",
          undefined,
          (draft) => {
            draft.push(data);
          }
        );
        const patchResult = dispatch(action);
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateTest: builder.mutation({
      query: (data) => ({
        url: `/api/test/${data.id}/`,
        method: 'PUT',
        body: data
      })
    }),
  })
})

export const {
  useListTestsQuery,
  useDetailTestQuery,
  useCreateTestMutation,
  useUpdateTestMutation
} = testApi;