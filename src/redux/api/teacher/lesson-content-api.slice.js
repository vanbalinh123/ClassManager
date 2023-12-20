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
        body: data
      })
    }),
    updateLessonContent: builder.mutation({
      query: (data) => ({
        url: `/api/lesson-content/${data.id}/`,
        method: 'PUT',
        body: data
      })
    })
  }),
});

export const { 
  useListLessonContentsQuery,
  useCreateLessonContentMutation,
  useUpdateLessonContentMutation
} = lessonContentApi;
