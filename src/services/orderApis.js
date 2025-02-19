import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const orderApis = {
  createUserOrder: (userId, formdata) =>
    apiService.post(apiEndpoints.order.createOrder(userId)),
  valiDateUserOrder: (formdata) =>
    apiService.post(apiEndpoints.order.validateOrder, formdata),
  getPaymentDetailsByOrderId: (orderId) =>
    apiService.post(apiEndpoints.order.getpaymentdetailsbyuserid(orderId)),
};

export default orderApis;
