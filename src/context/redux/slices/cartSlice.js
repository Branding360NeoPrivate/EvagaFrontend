import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userApi from "../../../services/userApi";
const initialState = {
  cart: [],
  status: "idle",
  error: null,
};

export const fetchUserCart = createAsyncThunk(
  "user/fetchUserCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserCart(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const userCartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userCartSlice.reducer;
