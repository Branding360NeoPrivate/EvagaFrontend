import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const categoryApi = {
  addCategory: (categoryData) =>
    apiService.post(apiEndpoints.category.add, categoryData, {
      headers: { "Content-Type": "multipart/form-data" }, // Ensure correct headers for file upload
    }),

  getCategories: () => apiService.get(apiEndpoints.category.getAll),

  addSubCategory: (subCategoryData) =>
    apiService.post(apiEndpoints.category.addSub, subCategoryData),

  getSubCategoriesByCategory: (categoryId) =>
    apiService.get(
      apiEndpoints.category.getSubCategoriesByCategory(categoryId)
    ),
};

export default categoryApi;
