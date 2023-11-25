import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //login mutation logic
    login: builder.mutation({
      query: ({ email, password, recaptchValue }) => ({
        url: "/user/login",
        method: "POST",
        body: {
          email,
          password,
          recaptchValue,
        },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("Login user details with jwt access_token");
          // console.log(result.data);
          dispatch(
            userLoggedIn({
              access_token: result.data.access_token,
              user: result.data.user,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    logout: builder.query({
      query: () => ({
        url: "/user/logout",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    
  }),
});

export const { useLoginMutation, useLogoutQuery } = authApi;
