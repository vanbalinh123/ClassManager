import apiSlice from "../api.slice";

const scheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listSchedules: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (data) => ({
        url: "/api/schedule/",
        params: data,
      }),
    }),
    createSchedule: builder.mutation({
      query: (data) => ({
        url: "api/schedule/",
        method: "POST",
        body: data,
      }),
    }),
    updateSchedule: builder.mutation({
      query: ( data ) => ({
        url: `api/schedule/${data.id}/`,
        method: "PUT",
        body: data
      }),
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useListSchedulesQuery,
  useUpdateScheduleMutation,
} = scheduleApi;
