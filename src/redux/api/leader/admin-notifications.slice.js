import apiSlice from "../api.slice";

const notificationsAdminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listNotiAdmin: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (data) => ({
        url: "/api/admin/notifications/",
        params: data,
      }),
    }),
    createNotiAdmin: builder.mutation({
      query: (data) => ({
        url: "/api/admin/notifications/",
        method: "POST",
        body: data,
      }),
      // async onQueryStarted(data, { dispatch, queryFulfilled }) {
      //   const action = apiSlice.util.updateQueryData(
      //     "listClass",
      //     undefined,
      //     (draft) => {
      //       draft.push(data);
      //     }
      //   );
      //   const patchResult = dispatch(action);
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    }),
  }),
});

export const {
  useListNotiAdminQuery,
  useCreateNotiAdminMutation
} = notificationsAdminApi