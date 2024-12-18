import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "../../../services/categoryServices";

const initialState = {
  categories: [],
  subCategories: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await categoryApi.addCategory(categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSubCategory = createAsyncThunk(
  "category/addSubCategory",
  async (subCategoryData, { rejectWithValue }) => {
    try {
      const response = await categoryApi.addSubCategory(subCategoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSubCategories = createAsyncThunk(
  "category/fetchSubCategories",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getSubCategoriesByCategory(categoryId);
      console.log("response:", response);

      return { categoryId, subCategories: response.data };
    } catch (error) {
      console.log("error in fetchSubCategories:", error);

      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Category
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories.push(action.payload.category);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Subcategory
      .addCase(addSubCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { categoryId } = action.payload.subCategory;
        if (!state.subCategories[categoryId]) {
          state.subCategories[categoryId] = [];
        }
        state.subCategories[categoryId].push(action.payload.subCategory);
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Subcategories
      .addCase(fetchSubCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subCategories[action.payload.categoryId] =
          action.payload.subCategories;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
