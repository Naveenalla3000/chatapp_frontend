import { apiSlice } from "../api/apiSlice";
import { setChatByUser } from "./chatSlice";

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
    getASpecificChat: builder.query({
      query: (chatId) => ({
        url: `chat/get-chat/${chatId}`,
        method: "GET",
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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            setChatByUser({
              userId: result.data?.chatId,
              message: result.data?.message?.content,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    //@last message of a chat
    getLastMessage: builder.query({
      query: (chatId) => ({
        url: `chat/get-lastMessage/${chatId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetASpecificChatQuery,
  useSendMessageMutation,
  useGetLastMessageQuery,
} = chatApi;
