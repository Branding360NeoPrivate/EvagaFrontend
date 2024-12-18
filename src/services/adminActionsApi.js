import apiEndpoints from "./apiEndpoints";
import apiService from "./apiService";

const adminActionsApi = {
  getAllVendorsWithProfileStatusAndService: () =>
    apiService.get(
      apiEndpoints.adminActions.getAllVendorsWithProfileStatusAndService
    ),
  verifyVendorDocument: (documentId) =>
    apiService.post(apiEndpoints.adminActions.verifyVendorDocument(documentId)),
};

export default adminActionsApi;
