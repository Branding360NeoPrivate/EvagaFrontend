import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const couponApi = {
  getAllValidCoupons: () => apiService.get(apiEndpoints.coupons.getAllCoupons),
  RemoveCoupon: (userId) => apiService.post(apiEndpoints.coupons.removeCoupon(userId)),
};

export default couponApi;
