import { createSlice } from "@reduxjs/toolkit";

import { baseApi, tagTypes } from "../../base.api";
type TUser = {
  id: string;
  email: string;
  role: "LEARNER" | "TEACHER"| "ADMIN";
  iat: number;
  profile_picture: string | undefined;
  exp: number;
};

type TInitialState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;

      state.token = token;
      state.user = user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      baseApi.util.invalidateTags(tagTypes);
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
