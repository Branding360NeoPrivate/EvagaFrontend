import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminActionsApi from "../../../services/adminActionsApi";

const initialState = {
  vendors: [],
  users: [],
  totalNumberOfVendors: 0,
  totalNumberOfUser: 0,
  totalNumberOfPageVendor: 0,
  status: "idle",
  error: null,
};

// Async thunk for fetching all vendors with profile status and service
export const fetchAllVendorsWithProfileStatusAndService = createAsyncThunk(
  "adminActions/fetchAllVendorsWithProfileStatusAndService",
  async ({ queryPage, searchTerm,filter }, { rejectWithValue }) => {
    try {
      const response = await adminActionsApi.getAllVendorsWithProfileStatusAndService(
        { queryPage, searchTerm,filter }
      );
      console.log(
        "response for all vendors with profile status and service:",
        response
      );

      return response.data;
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
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload;
    },
    totalUserCount: (state, action) => {
      state.totalNumberOfUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVendorsWithProfileStatusAndService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllVendorsWithProfileStatusAndService.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.totalNumberOfPageVendor = action.payload.totalPages;
          state.totalNumberOfVendors = action.payload.totalVendors;
          state.vendors = action.payload.data;
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
      })
      .addCase(verifyVendorDocument.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { totalUserCount, addUser } = adminActionsSlice.actions;
export default adminActionsSlice.reducer;
