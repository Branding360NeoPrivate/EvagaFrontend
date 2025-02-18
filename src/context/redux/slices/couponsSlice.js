import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminActionsApi from "../../../services/adminActionsApi";

const initialState = {
  coupons: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchCoupons = createAsyncThunk(
    "coupons/fetchCoupons",
    async (_, { rejectWithValue }) => {
      try {
        const response = await adminActionsApi.getAllCoupons();
        console.log(response);
        
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  const couponSlice = createSlice({
    name: "couponSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCoupons.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchCoupons.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.coupons = action.payload;
        })
        .addCase(fetchCoupons.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
       
    },
  });
  
  export default couponSlice.reducer;