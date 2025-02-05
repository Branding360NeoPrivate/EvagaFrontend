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
    apiService.post(
      apiEndpoints.adminActions.addBanner,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  editBanner: (bannerId, formData) =>
    apiService.post(
      apiEndpoints.adminActions.editBanner(bannerId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
    deleteBanner: (bannerId, formData) =>
    apiService.post(
      apiEndpoints.adminActions.deleteBanner(bannerId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
};

export default adminActionsApi;
