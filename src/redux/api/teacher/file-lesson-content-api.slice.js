import apiSlice from "../api.slice";

const filelessonContent = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFileLessonContent: builder.mutation({
      query: (data) => ({
        url: `/api/file/`,
        method: 'POST',
        body: data,
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      })
    }),
    updateFileLessonContent: builder.mutation({
      query: (data) => {
        const id = data.get('id');
        return {
          url: `/api/file/${id}/`,
          method: 'PATCH',
          body: data
        };
      }
    }),
    deleteFileLessonContent: builder.mutation({
      query: (id) => {
        return {
          url: `/api/file/${id}/`,
          method: 'DELETE',
          // body: data
        };
      }
    })
  })
})

export const {
    useCreateFileLessonContentMutation,
    useUpdateFileLessonContentMutation,
    useDeleteFileLessonContentMutation
} = filelessonContent