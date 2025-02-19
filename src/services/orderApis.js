import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const orderApis = {
  createUserOrder: (userId, formdata) =>
    apiService.post(apiEndpoints.order.createOrder(userId)),
  valiDateUserOrder: (formdata) =>
    apiService.post(apiEndpoints.order.validateOrder, formdata),
  getPaymentDetailsByOrderId: (orderId) =>
    apiService.post(apiEndpoints.order.getpaymentdetailsbyuserid(orderId)),
  getPaymentDetailsByOrderId: (orderId) =>
    apiService.post(apiEndpoints.order.getpaymentdetailsbyuserid(orderId)),
  getAllNewOrder: () => apiService.get(apiEndpoints.order.getallneworder),
  getAllCancelledOrder: () =>
    apiService.get(apiEndpoints.order.getallcancelledorder),
  getAllOngoingOrder: () =>
    apiService.get(apiEndpoints.order.getallongoingorder),
  getAllCompleteOrder: () =>
    apiService.get(apiEndpoints.order.getallcompleteorder),
  getAllConfirmedOrder: () =>
    apiService.get(apiEndpoints.order.getallconfirmedorder),
};

export default orderApis;
