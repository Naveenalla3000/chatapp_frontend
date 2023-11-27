import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userRefresh, userUserRefresh } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_SERVER_URI,
  }),
  endpoints: (builder) => ({
    //refresh
    refreshToken: builder.query({
      query: (data) => ({
        url: "user/refresh",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log(result.data);
          dispatch(
            userRefresh({
              access_token: result.data.access_token,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    //me
    loadUser: builder.query({
      query: (data) => ({
        url: "user/me",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log(result.data);
          dispatch(
            userUserRefresh({
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoadUserQuery, useRefreshTokenQuery } = apiSlice;
