import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_SERVER_URI,
  }),
  endpoints: (builder) => ({

    refreshToken: builder.query({
      query: (data) => ({
        url: "refresh",
        method: "GET",
        credentials: "include",
      }),
    }),

    loadUser: builder.query({
      query: (data) => ({
        url: "user/me",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              access_token: result.data.activation_token,
              user: result.data.user,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {useLoadUserQuery,useRefreshTokenQuery} = apiSlice;
