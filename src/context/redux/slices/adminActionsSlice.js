import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminActionsApi from "../../../services/adminActionsApi";

const initialState = {
  vendors: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching all vendors with profile status and service
export const fetchAllVendorsWithProfileStatusAndService = createAsyncThunk(
  "adminActions/fetchAllVendorsWithProfileStatusAndService",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await adminActionsApi.getAllVendorsWithProfileStatusAndService();
      console.log(
        "response for all vendors with profile status and service:",
        response
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for verifying vendor document
export const verifyVendorDocument = createAsyncThunk(
  "adminActions/verifyVendorDocument",
  async (documentId, { rejectWithValue }) => {
    try {
      const response = await adminActionsApi.verifyVendorDocument(documentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminActionsSlice = createSlice({
  name: "adminActions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVendorsWithProfileStatusAndService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllVendorsWithProfileStatusAndService.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.vendors = action.payload;
        }
      )
      .addCase(
        fetchAllVendorsWithProfileStatusAndService.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      )
      .addCase(verifyVendorDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyVendorDocument.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Handle the successful verification, e.g., update vendor status
      })
      .addCase(verifyVendorDocument.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default adminActionsSlice.reducer;
