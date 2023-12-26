import apiSlice from "../api.slice";

const costApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listCost: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (data) => ({
        url: `/api/cost/`,
        params: data
      }),
    })
  })
})

export const {
  useListCostQuery
} = costApi