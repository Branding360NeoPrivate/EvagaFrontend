import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const couponApi = {
  getAllValidCoupons: () => apiService.get(apiEndpoints.coupons.getAllCoupons),
};

export default couponApi;
