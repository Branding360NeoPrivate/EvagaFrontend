import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const commonApis = {
  getAllBanner: () => apiService.get(apiEndpoints.common.getAllBanner()),
  
};

export default commonApis;
