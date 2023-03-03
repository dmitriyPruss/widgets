import { LoginDto, UserCreationDto } from '@boilerplate/shared';
import { setToken } from '../reducers/auth.slice';
import { mainApi } from './main-api.api';


export const authEndpoints = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginDto>({
      query: data => ({
        url: '/users/login',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
        } catch (e) {
          console.error(e);
        }
      },
      invalidatesTags: ['Auth']
    }),
    signUp: builder.mutation<string, UserCreationDto>({
      query: data => ({
        url: '/users/signup',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
        } catch (e) {
          console.error(e);
        }
      },
      invalidatesTags: ['Auth']
    })
  })
});

export const { useLoginMutation, useSignUpMutation } = authEndpoints;