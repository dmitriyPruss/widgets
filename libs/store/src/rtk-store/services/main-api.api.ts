import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';


const baseUrl = 'http://localhost:3000/api';

export const mainApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem('token');

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    }
  }),
  tagTypes: ['Auth', 'Channel', 'Widget'],
  endpoints: builder => ({})
});
