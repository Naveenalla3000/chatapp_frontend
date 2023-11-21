import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      const { access_token, user } = action.payload;
      state.token = access_token;
      state.user = user;
    },

    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
    },

    userRefresh: (state, action) => {
      const { access_token, user } = action.payload;
      state.token = access_token;
      state.user = user;
    },

    userUserRefresh: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
  },
});

export const { userLoggedIn, userLoggedOut, userRefresh,userUserRefresh } = authSlice.actions;

export default authSlice.reducer;
