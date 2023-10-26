import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    prepareHeaders: (headers) => {
        // const token = JSON.parse(localStorage.getItem('accessToken'));
        // console.log(token)
        // if (token) {
        //     headers.set('Authorization', `Bearer ${token}`);
        //     headers.set('Content-Type', 'application/json');
        // }
        headers.set('Content-Type', 'application/json');
        return headers;
    }
});



const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})

export default apiSlice;