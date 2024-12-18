import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

const userSearchSlice = createSlice({
  name: "userSearch",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = userSearchSlice.actions;
export default userSearchSlice.reducer;
