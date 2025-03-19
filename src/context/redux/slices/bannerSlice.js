import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commonApis from "../../../services/commonApis";

const initialState = {
  banner: [],
  userBanner: [],
  vendorBanner: [],
  error: null,
  status: "idle",
};

export const fetchBanner = createAsyncThunk(
  "banner/fetchBanner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await commonApis.getAllBanner();
      return response.data?.banners;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchUserBanner = createAsyncThunk(
  "banner/fetchUserBanner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await commonApis.getUserBanner();
      return response.data?.banners;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchVendorBanner = createAsyncThunk(
  "banner/fetchVendorBanner",
  async (_, { rejectWithValue }) => {
    try {
      console.log("hittig  for banner:");
      const response = await commonApis.getVendorBanner();
      console.log("response for banner:", response);
      return response.data?.banners;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banner = action.payload;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userBanner = action.payload;
      })
      .addCase(fetchUserBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchVendorBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVendorBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vendorBanner = action.payload;
      })
      .addCase(fetchVendorBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default bannerSlice.reducer;
