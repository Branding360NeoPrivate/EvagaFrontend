import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vendorApi from "../../../services/vendorApi";

const initialState = {
  profile: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  profilePercentage: null,
  allService: [],
};

export const fetchVendorProfile = createAsyncThunk(
  "vendor/fetchVendorProfile",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await vendorApi.getProfile(vendorId);
      console.log("response for vendor profile:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVendorProfilePercentage = createAsyncThunk(
  "vendor/fetchVendorProfilePercentage",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await vendorApi.getProfilePercentage(vendorId);
      console.log("response for vendor profile:", response);
      return response.data; // The data will be the payload for fulfilled
    } catch (error) {
      // Return error message for rejected action
      return rejectWithValue(error.message);
    }
  }
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendorProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearVendorProfile: (state) => {
      state.profile = null;
    },
    addService: (state, action) => {
      state.allService = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Use payload from rejectWithValue
      })
      .addCase(fetchVendorProfilePercentage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVendorProfilePercentage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profilePercentage = action.payload;
      })
      .addCase(fetchVendorProfilePercentage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Use payload from rejectWithValue
      });
  },
});

export const { setVendorProfile, clearVendorProfile, addService } =
  vendorSlice.actions;
export default vendorSlice.reducer;
