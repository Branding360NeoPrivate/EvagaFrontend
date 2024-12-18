import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../../services/adminApi";

// Async thunk to fetch admin details
export const fetchAdminDetails = createAsyncThunk(
  "admin/fetchAdminDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await adminApi.getOne(userId);
      console.log("response for admin details:", response);

      return response.data;
    } catch (error) {
      console.log("error in fetchAdminDetails:", error);

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    details: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.details = action.payload;
      })
      .addCase(fetchAdminDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
