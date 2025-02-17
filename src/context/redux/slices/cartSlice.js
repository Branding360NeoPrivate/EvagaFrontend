import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userApi from "../../../services/userApi";
const initialState = {
  cart: [],
  status: "idle",
  error: null,
};

export const fetchUserCart = createAsyncThunk(
  "user/fetchUserCart",
  async ({ userId, query = {} }, { rejectWithValue }) => {
    console.log(userId, query);

    try {
      if (!userId) {
        throw new Error("User ID is required.");
      }

      const queryString = typeof query === 'object' && !Array.isArray(query)
      ? `?${Object.entries(query)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value || '')}`)
          .join('&')}`
      : "";
    

      const response = await userApi.getUserCart(`${userId}${queryString}`);
      return response.data;
    } catch (error) {
      const errorMessage = {
        message: error.message || "An error occurred.",
        status: error.response?.status || 500,
        details: error.response?.data || null,
      };
      return rejectWithValue(errorMessage);
    }
  }
);

const userCartSlice = createSlice({
  name: "userCart",
  initialState,

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

export const { applyCard } = userCartSlice.actions;
export default userCartSlice.reducer;
