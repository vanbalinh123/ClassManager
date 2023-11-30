import apiSlice from "../api.slice";

const notiteacher = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listNotiTeacher: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (data) => ({
        url: "/api/teacher/notifications/",
        params: data,
      }),
    }),
    createNotiTeacher: builder.mutation({
      query: (data) => ({
        url: '/api/teacher/notifications/',
        method: 'POST',
        body: data
      })
    })
  }),
});

export const { 
  useListNotiTeacherQuery,
  useCreateNotiTeacherMutation 
} = notiteacher;
