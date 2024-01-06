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
    classDetail: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (classcode) => ({
        url: `/api/class/${classcode}/`,
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
    updateClass: builder.mutation({
      query: ({ class_code, class_name, course, cost }) => ({
        url: `api/class/${class_code}/`,
        method: "PUT",
        body: { class_code, class_name, course, cost },
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const action = apiSlice.util.updateQueryData(
          "classDetail",
          undefined,
          (draft) => {
            draft.class_code = data.class_code;
            draft.class_name = data.class_name;
            draft.course = data.course;
            draft.cost = data.cost;
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
    deleteClass: builder.mutation({
      query: (classcode) => ({
        url: `api/class/${classcode}/`,
        method: "DELETE",
      }),
      async onQueryStarted(classcode, { dispatch, queryFulfilled }) {
        const action = apiSlice.util.updateQueryData(
          "listClass",
          undefined,
          (draft) => {
            const index = draft.findIndex(
              (item) => item.class_code === classcode
            );
           
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
  useCreateClassMutation,
  useListClassQuery,
  useClassDetailQuery,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classApi;
