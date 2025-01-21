import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,

  allPackages: [],
};

const PackageSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    addPackage: (state, action) => {
      state.allPackages = action.payload;
    },
  },
});

export const { addPackage } = PackageSlice.actions;
export default PackageSlice.reducer;
