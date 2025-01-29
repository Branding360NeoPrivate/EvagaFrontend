import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../../services/userApi";

const initialState = {
  profile: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  "vendor/fetchUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserProfile(userId);
      console.log("response for vendor profile:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserProfile: (state, action) => {
      state.profile = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; 
      })
 
  },
});

export const { setVendorProfile, clearVendorProfile, addService } =
userSlice.actions;
export default userSlice.reducer;
