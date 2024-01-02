import apiSlice from "../api.slice";

const lessonContentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listLessonContents: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (data) => ({
        url: "/api/lesson-content/",
        params: data,
      }),
    }),
    createLessonContent: builder.mutation({
      query: (data) => ({
        url: `/api/lesson-content/`,
        method: 'POST',
        body: data,
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      })
    }),
    updateLessonContent: builder.mutation({
      query: (data) => {
        const lessonId = data.get('id');
        return {
          url: `/api/lesson-content/${lessonId}/`,
          method: 'PUT',
          body: data
        };
      }
    })
    
  }),
});

export const { 
  useListLessonContentsQuery,
  useCreateLessonContentMutation,
  useUpdateLessonContentMutation
} = lessonContentApi;
