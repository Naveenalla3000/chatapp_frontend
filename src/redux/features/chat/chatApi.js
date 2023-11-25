import { apiSlice } from "../api/apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //@only admin
    getAllUsers: builder.query({
      query: () => ({
        url: `chat/get-users`,
        method: "GET",
        credentials: 'include',
      }),
    }),

   
  }),
});

export const { useGetAllUsersQuery } = chatApi;
