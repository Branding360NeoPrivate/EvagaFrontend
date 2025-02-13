import apiEndpoints from "./apiEndpoints";
import apiService from "./apiService";

const adminActionsApi = {
  getAllVendorsWithProfileStatusAndService: () =>
    apiService.get(
      apiEndpoints.adminActions.getAllVendorsWithProfileStatusAndService
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
    apiService.get(
      apiEndpoints.adminActions.getVendorByNameOrUserName,
      formData
    ),
};

export default adminActionsApi;
