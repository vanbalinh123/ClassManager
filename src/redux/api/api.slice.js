import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const csrfMiddleware = (store) => (next) => (action) => {
  if (action.type.startsWith('api/')) {
    const csrfToken = localStorage.getItem('csrfToken'); // Lấy CSRF token từ Local Storage
    if (csrfToken) {
      action.meta.headers = {
        ...action.meta.headers,
        'X-CSRFToken': csrfToken,
      };
    }
  }
  return next(action);
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(csrfMiddleware),
  endpoints: () => ({})
});

export default apiSlice;


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const csrfMiddleware = (store) => (next) => (action) => {
//   if (action.type.startsWith('api/')) {
//     const csrfToken = localStorage.getItem('csrfToken'); 
//     if (csrfToken) {
//       action.meta.headers = {
//         ...action.meta.headers,
//         'X-CSRFToken': csrfToken,
//       };
//     }
//   }
//   return next(action);
// };

// const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://127.0.0.1:8000/',
//     // Sử dụng middleware CSRF cho tất cả các yêu cầu
//     prepareHeaders: (headers, { getState }) => {
//       const csrfToken = localStorage.getItem('csrfToken'); 
//       if (csrfToken) {
//         headers.set('X-CSRFToken', csrfToken);
//       }
//       return headers;
//     },
//   }),
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(csrfMiddleware),
//   endpoints: () => ({}),
// });

// export default apiSlice;
