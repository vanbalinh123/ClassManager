// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const csrfMiddleware = (store) => (next) => (action) => {
//   if (action.type.startsWith('api/')) {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       action.meta.headers = {
//         ...action.meta.headers,
//         'Authorization': `Bearer ${token}`,
//       };
//     }
//   }
//   return next(action);
// };

// const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(csrfMiddleware),
//   endpoints: () => ({})
// });

// export default apiSlice;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/',
    prepareHeaders: (headers) => {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        console.log(token)
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

// const baseQueryWithAuth = async (args, api, extraOptions) => {
//     const result = await baseQuery(args, api, extraOptions);
//     // console.log("hehe", result, args, api, extraOptions);
//     if (args.url !== 'register') {
//         if (result.error && result.error.originalStatus === 401) {
//             window.location.href = '/login';
//         }
//     }
//     return result;
// };

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})

export default apiSlice;