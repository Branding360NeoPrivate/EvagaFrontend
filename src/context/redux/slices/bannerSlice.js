import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commonApis from "../../../services/commonApis";


const initialState = {
  banner: [],
  error: null,
};

export const fetchBanner = createAsyncThunk(
  "banner/fetchBanner",
  async (_, { rejectWithValue }) => {
    try {
        console.log("hittig  for banner:");
      const response = await commonApis.getAllBanner();
      console.log("response for banner:", response);
      return response.data;
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
      });
  },
});


export default bannerSlice.reducer;
