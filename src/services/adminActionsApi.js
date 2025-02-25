import apiEndpoints from "./apiEndpoints";
import apiService from "./apiService";

const adminActionsApi = {
  getAllVendorsWithProfileStatusAndService: ({
    queryPage,
    searchTerm,
    filter,
  }) =>
    apiService.get(
      apiEndpoints.adminActions.getAllVendorsWithProfileStatusAndService,
      {
        page: queryPage,
        search: searchTerm,
        filter: filter,
      }
    ),

  verifyVendorDocument: (documentId) =>
    apiService.post(apiEndpoints.adminActions.verifyVendorDocument(documentId)),
  updateVendorBankDetailsByAdmin: (vendorID, formData) =>
    apiService.post(
      apiEndpoints.adminActions.updateVendorBankDetailsByAdmin(vendorID),
      formData
    ),
  updateVendorBusinessDetailsByAdmin: (vendorID, formData) =>
    apiService.post(
      apiEndpoints.adminActions.updateVendorBusinessDetailsByAdmin(vendorID),
      formData
    ),
  updateVendorProfileUpdateByAdmin: (vendorID, formData) =>
    apiService.post(
      apiEndpoints.adminActions.updateVendorProfileUpdateByAdmin(vendorID),
      formData
    ),
  updateVendorBioUpdateByAdmin: (vendorID, formData) =>
    apiService.post(
      apiEndpoints.adminActions.updateVendorBioUpdateByAdmin(vendorID),
      formData
    ),
  updateVendorProfilePicUpdateByAdmin: (vendorID, formData) =>
    apiService.post(
      apiEndpoints.adminActions.updateVendorProfilePicUpdateByAdmin(vendorID),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  addBanner: (formData) =>
    apiService.post(apiEndpoints.adminActions.addBanner, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  getOneBanner: (bannerId) =>
    apiService.get(apiEndpoints.adminActions.getOneBanner(bannerId)),
  editBanner: (bannerId, formData) =>
    apiService.post(apiEndpoints.adminActions.editBanner(bannerId), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  deleteBanner: (bannerId) =>
    apiService.delete(apiEndpoints.adminActions.deleteBanner(bannerId)),
  getAllCoupons: () => apiService.get(apiEndpoints.adminActions.getAllCoupons),
  addCoupons: (formData) =>
    apiService.post(apiEndpoints.adminActions.addCoupons, formData),
  getOneCoupons: (couponId) =>
    apiService.get(apiEndpoints.adminActions.getOneCoupons(couponId)),
  editOneCoupons: (couponId, formData) =>
    apiService.put(
      apiEndpoints.adminActions.editOneCoupons(couponId),
      formData
    ),
  deleteOneCoupons: (couponId) =>
    apiService.delete(apiEndpoints.adminActions.deleteOneCoupons(couponId)),
  getAllCategoryFees: () =>
    apiService.get(apiEndpoints.adminActions.getAllCategoryFees),
  addCategoryFees: (formData) =>
    apiService.post(apiEndpoints.adminActions.addCategoryFees, formData),
  getOneFees: (feeId) =>
    apiService.get(apiEndpoints.adminActions.getOneFees(feeId)),
  editOneFees: (feeId, formData) =>
    apiService.put(apiEndpoints.adminActions.editOneFees(feeId), formData),
  deleteOneFees: (feeId) =>
    apiService.delete(apiEndpoints.adminActions.deleteOneFees(feeId)),
  getVendorByNameOrUserName: (formData) =>
    apiService.post(
      apiEndpoints.adminActions.getVendorByNameOrUserName,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  verifyVendorprofileByAdmin: (vendorId) =>
    apiService.post(apiEndpoints.adminActions.verifyVendorprofile(vendorId)),
  getAllCategoryGstFees: (vendorId) =>
    apiService.get(apiEndpoints.adminActions.getAllCategoryGstFees),
  addCategoryGstFees: (formData) =>
    apiService.post(apiEndpoints.adminActions.addCategoryGstFees, formData),
  GetVendorPackageList: (vendorId, categoryId) =>
    apiService.get(
      apiEndpoints.adminActions.getVendorPackageList(vendorId, categoryId)
    ),
};

export default adminActionsApi;
