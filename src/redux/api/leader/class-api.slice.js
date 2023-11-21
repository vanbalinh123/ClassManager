import apiSlice from "../api.slice";

const classApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listClass: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (data) => ({
        url: "/api/class/",
        params: data,
      }),
    }),
    createClass: builder.mutation({
      query: (data) => ({
        url: "api/class/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const action = apiSlice.util.updateQueryData(
          "listClass",
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
  }),
});

export const { useCreateClassMutation, useListClassQuery } = classApi;
