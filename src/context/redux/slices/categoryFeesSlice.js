import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "../../../services/categoryServices";
import adminActionsApi from "../../../services/adminActionsApi";

const initialState = {
  categoryFees: [],
  status: "idle", 
  error: null,
};

export const fetchCategoryFess = createAsyncThunk(
  "category/fetchCategoryFess",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminActionsApi.getAllCategoryFees();
      return response.data?.categoryFees;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const CategoryFessSlice = createSlice({
  name: "CategoryFess",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryFess.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryFess.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryFees = action.payload;
      })
      .addCase(fetchCategoryFess.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
  },
});

export default CategoryFessSlice.reducer;