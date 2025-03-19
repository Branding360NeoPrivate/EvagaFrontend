import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  isLoading: false,
  allPackages: [],
};

const PackageSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    addPackage: (state, action) => {
      state.allPackages = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { addPackage, setLoading } = PackageSlice.actions;
export default PackageSlice.reducer;
