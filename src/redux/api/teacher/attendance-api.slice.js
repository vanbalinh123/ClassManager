import apiSlice from "../api.slice";

const attentdanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listAttendance: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (data) => ({
        url: "/api/attendancerecord/",
        params: data,
      }),
    })
  })
})

export const {
  useListAttendanceQuery
} = attentdanceApi;