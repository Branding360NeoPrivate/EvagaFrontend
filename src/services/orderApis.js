import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const orderApis = {
  createUserOrder: (userId, numofParts, formdata) => {
    // Log formdata to check if it is coming correctly
    console.log("Formdata:", formdata);

    // Proceed with the API call
    return apiService.post(
      apiEndpoints.order.createOrder(userId, numofParts),
      formdata
    );
  },

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
  getOrderByUserId: (userId) =>
    apiService.get(apiEndpoints.order.getorderbyuserid(userId)),
  getOrderByUserId: (userId) =>
    apiService.get(apiEndpoints.order.getorderbyuserid(userId)),
  getOneUserOrderByOrderId: (orderId, itemId) =>
    apiService.get(
      apiEndpoints.order.getoneuserorderbyorderid(orderId, itemId)
    ),
  getNewOrderByVendorId: (vendorId) =>
    apiService.get(apiEndpoints.order.getneworderbyvendorid(vendorId)),
  getConfirmedOrderByVendorId: (vendorId) =>
    apiService.get(apiEndpoints.order.getconfirmedorderbyvendorid(vendorId)),
  getvendoractiveorders: (vendorId) =>
    apiService.get(apiEndpoints.order.getVendorActiveOrders(vendorId)),
  getAllCompletedOrders: (vendorId) =>
    apiService.get(apiEndpoints.order.getAllCompletedOrders(vendorId)),
  getAllCancelledOrders: (vendorId) =>
    apiService.get(apiEndpoints.order.getAllCancelledOrders(vendorId)),
  AcceptUserOrderbyorderId: (orderId, id) =>
    apiService.post(apiEndpoints.order.acceptUserOrderbyorderId(orderId, id)),
  StartUserOrderbyorderId: (orderId, id) =>
    apiService.post(apiEndpoints.order.startUserOrderbyorderId(orderId, id)),
  EndUserorderbyorderId: (orderId, id) =>
    apiService.post(apiEndpoints.order.endUserorderbyorderId(orderId, id)),
  VerifyStartServicebyorderId: (orderId, id, formdata) =>
    apiService.post(
      apiEndpoints.order.verifyStartServicebyorderId(orderId, id),
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  verifyEndServiceOrderId: (orderId, id, formdata) =>
    apiService.post(
      apiEndpoints.order.verifyEndServiceorderId(orderId, id),
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
};

export default orderApis;
