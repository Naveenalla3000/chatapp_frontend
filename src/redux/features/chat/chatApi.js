import { apiSlice } from "../api/apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //@only admin and helper
    getAllUsers: builder.query({
      query: () => ({
        url: `chat/get-users`,
        method: "GET",
        credentials: "include",
      }),
    }),

    //@only admin and helper
    getASpecificChat: builder.mutation({
      query: (data) => ({
        url: `chat/get-chat`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    //@any one can send message
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `chat/send-message`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetASpecificChatMutation,useSendMessageMutation } = chatApi;
