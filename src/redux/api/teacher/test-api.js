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
        method: "POST",
        body: data,
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
    //   async onQueryStarted(data2, { queryFulfilled, dispatch }) {
    //     try {
    //         const { data: created } = await queryFulfilled;
    //         dispatch(apiSlice.util.updateQueryData('listTests', undefined, (draft) => {
    //             draft?.push(created);
    //         }))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    }),
    updateTest: builder.mutation({
      query: (data) => ({
        url: `/api/test/${data.id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTest: builder.mutation({
      query: (id) => ({
        url: `/api/test/${id}/`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const action = apiSlice.util.updateQueryData(
          "listTests",
          undefined,
          (draft) => {
            const index = draft.findIndex((item) => item.id === id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
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
  }),
});

export const {
  useListTestsQuery,
  useDetailTestQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
} = testApi;
