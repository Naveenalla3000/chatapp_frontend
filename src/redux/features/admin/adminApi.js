import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //@desc getavailableHelpers
    //@only admin
    getavailableHelpers: builder.query({
      query: () => ({
        url: "/admin/get-helpers",
        method: "GET",
        credentials: "include",
      }),
    }),

    //@desc changehelper
    //@only admin
    changehelper: builder.mutation({
      query: (data) => ({
        url: "/admin/change-helper",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    //@desc changeRole
    //@only admin
    changeRole: builder.mutation({
      query: (data) => ({
        url: "/admin/change-role",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    //@desc getHelperifno if selected user is helper
    //@only admin
    getHelperinfo: builder.query({
      query: (helperId) => ({
        url: `/admin/get-helperInfo/${helperId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetavailableHelpersQuery,
  useChangehelperMutation,
  useChangeRoleMutation,
  useGetHelperinfoQuery,
} = adminApi;
