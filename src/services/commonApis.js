import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const commonApis = {
  getAllBanner: () => apiService.get(apiEndpoints.common.getAllBanner()),
  getUserBanner: () => apiService.get(apiEndpoints.common.getUserBanner()),
  getVendorBanner: () => apiService.get(apiEndpoints.common.getVendorBanner()),
  addToWaitlist: (formdata) =>
    apiService.post(apiEndpoints.common.addtowaitlist, formdata),
  addFeedBack: (formdata) =>
    apiService.post(apiEndpoints.common.addfeedback, formdata),
  getAllFeedBack: () => apiService.get(apiEndpoints.common.getallfeedback),
  getAllAaitlist: () => apiService.get(apiEndpoints.common.getallwaitlist),
};

export default commonApis;
