import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "@/interfaces/user";
import { apiSlice } from "../api/apiSlice";

export interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = { user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.auth.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
      }
    );
  },
  selectors: {
    selectCurrentUser: (auth) => auth.user,
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCurrentUser } = authSlice.selectors;
