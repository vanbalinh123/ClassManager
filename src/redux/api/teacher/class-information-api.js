import apiSlice from "../api.slice";

const classInforApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listInforClass: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (data) => ({
        url: "/api/class-information/",
        params: data,
      }),
    }),
    inforClass: builder.query({
      // serializeQueryArgs: () => {
      //   return undefined;
      // },
      query: (classCode) => ({
        url: `/api/class-information/${classCode}/`,
        // params: classCode,
      }),
    }),
    createInfoClass: builder.mutation({
      query: (data) => ({
        url: `/api/class-information/`,
        method: "POST",
        body: data,
      }),
    }),
    updateInfoClass: builder.mutation({
      query: (data) => ({
        url: `/api/class-information/${data.class_info}/`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const action = apiSlice.util.updateQueryData(
          "inforClass",
          data.class_info,
          (draft) => {
            draft.students = data.students;
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
  useListInforClassQuery,
  useInforClassQuery,
  useCreateInfoClassMutation,
  useUpdateInfoClassMutation,
} = classInforApi;
