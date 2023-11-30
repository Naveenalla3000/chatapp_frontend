import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatByUser: (state, action) => {
      const { userId, message } = action.payload;
      const index = state.findIndex((item) => item.userId === userId);
      if (index !== -1) {
        // If the user already exists in the state, update their message
        state[index].message = message;
      } else {
        // If the user doesn't exist, add a new entry
        state.push({ userId, message });
      }
    },
  },
});

export const { setChatByUser } = chatSlice.actions;

export default chatSlice.reducer;
