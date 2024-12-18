// src/services/api/vendorApi.js

import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const vendorApi = {
  register: (vendorData) =>
    apiService.post(apiEndpoints.vendor.register, vendorData),
  login: (credentials) =>
    apiService.post(apiEndpoints.vendor.login, credentials),
  logout: (vendorId) => apiService.post(apiEndpoints.vendor.logout(vendorId)),
  changePassword: (vendorId, passwords) =>
    apiService.put(apiEndpoints.vendor.changePassword(vendorId), passwords),
  deleteAccount: (vendorId) =>
    apiService.delete(apiEndpoints.vendor.deleteAccount(vendorId)),
  getProfile: (vendorId) =>
    apiService.get(apiEndpoints.vendor.getProfile(vendorId)),
  updateProfile: (vendorId, profileData) =>
    apiService.put(apiEndpoints.vendor.updateProfile(vendorId), profileData),
  updateBankDetails: (vendorId, bankData) =>
    apiService.post(apiEndpoints.vendor.updateBankDetails(vendorId), bankData),
  uploadDocuments: (vendorId, documentData) =>
    apiService.post(
      apiEndpoints.vendor.uploadDocuments(vendorId),
      documentData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  updateBio: (vendorId, bio) =>
    apiService.post(apiEndpoints.vendor.updateBio(vendorId), bio),
  updateProfilePicture: (vendorId, profilePic) =>
    apiService.post(
      apiEndpoints.vendor.updateProfilePicture(vendorId),
      profilePic,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  updateCalendar: (vendorId, bookingData) =>
    apiService.post(apiEndpoints.vendor.updateCalendar(vendorId), bookingData),
  updateBusiness: (vendorId, businessData) =>
    apiService.post(apiEndpoints.vendor.updateBusiness(vendorId), businessData),
  addNewCategoryBusiness: (businessId, categoryData) =>
    apiService.post(
      apiEndpoints.vendor.addNewCategoryBusiness(businessId),
      categoryData
    ),
  getProfilePercentage: (vendorId) =>
    apiService.get(apiEndpoints.vendor.getProfilePercentage(vendorId)),
  getMonthlyBooking: (vendorId, formData) =>
    apiService.get(
      apiEndpoints.vendor.getAllMonthlyBooking(vendorId, formData),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  addVendorBooking: (vendorId, formData) =>
    apiService.post(
      apiEndpoints.vendor.addVendorCalenderBooking(vendorId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  getSelectedcategoryForm: (categoryId, subCategoryId) =>
    apiService.get(
      apiEndpoints.vendor.getSelectedCategoryAndSubCategoryForm(
        categoryId,
        subCategoryId
      )
    ),
  addNewvendorService: (vendorId, formData) =>
    apiService.post(
      apiEndpoints.vendor.addNewServiceVendor(vendorId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  getvendorAllService: (vendorId, formData) =>
    apiService.get(apiEndpoints.vendor.getAllVendorServiceById(vendorId)),
};

export default vendorApi;
