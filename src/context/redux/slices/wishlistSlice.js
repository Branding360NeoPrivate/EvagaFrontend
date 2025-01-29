import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../../services/userApi";

const initialState = {
  allWishlist: [],
};
export const fetchUserWishlist = createAsyncThunk(
  "wishlist/get-wishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userApi.Wishlist(userId);
      return response.data?.wishlist;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const userWishlist = createSlice({
  name: "userWishlist",
  initialState,
  reducers: {
    addWishlist(state, action) {
      state.allWishlist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allWishlist = action.payload;
      })
      .addCase(fetchUserWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addWishlist } = userWishlist.actions;
export default userWishlist.reducer;
