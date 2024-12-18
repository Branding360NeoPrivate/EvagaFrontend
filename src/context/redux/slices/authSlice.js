import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  role: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      const { accessToken, role, userId } = action.payload;
      state.isAuthenticated = true;
      state.role = role;
      state.accessToken = accessToken;
      state.userId = userId;
    },
    logoutReducer: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.accessToken = null;
      state.userId = null;
    },
  },
});

export const { loginReducer, logoutReducer } = authSlice.actions;
export default authSlice.reducer;
