import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const categoryApi = {
  addCategory: (categoryData) =>
    apiService.post(apiEndpoints.category.add, categoryData, {
      headers: { "Content-Type": "multipart/form-data" }, // Ensure correct headers for file upload
    }),

  getCategories: () => apiService.get(apiEndpoints.category.getAll),
  updateCategory: (catId, categoryData) =>
    apiService.put(apiEndpoints.category.updateCategory(catId), categoryData),
  deleteCategory: (catId) =>
    apiService.delete(apiEndpoints.category.deleteCategory(catId)),

  addSubCategory: (subCategoryData) =>
    apiService.post(apiEndpoints.category.addSub, subCategoryData),

  getSubCategoriesByCategory: (categoryId) =>
    apiService.get(
      apiEndpoints.category.getSubCategoriesByCategory(categoryId)
    ),
  getOneSubCategory: (subCategoryId) =>
    apiService.get(apiEndpoints.category.getOneSubCategory(subCategoryId)),
  deleteSubCategory: (subCategoryId) =>
    apiService.delete(apiEndpoints.category.deleteSubCategory(subCategoryId)),
  updateSubCategory: (subCategoryId, subCategoryData) =>
    apiService.put(
      apiEndpoints.category.updateSubCategory(subCategoryId),
      subCategoryData
    ),
};

export default categoryApi;
