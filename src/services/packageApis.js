import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const packageApis = {
  getAllPackage: (queryParams) =>
    apiService.get(apiEndpoints.packages.getAllPackages(), queryParams),
  getOnePackage: (serviceId, packageId, queryParams) =>
    apiService.get(apiEndpoints.packages.getOnePackage(serviceId, packageId)),
};

export default packageApis;
