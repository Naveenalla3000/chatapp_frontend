import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    //change password mutation
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/user/update-password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});


export const { useChangePasswordMutation } = userApi;
