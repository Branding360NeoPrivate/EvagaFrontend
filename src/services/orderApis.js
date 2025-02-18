import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const orderApis = {
  createUserOrder: (userId,formdata) =>
    apiService.post(apiEndpoints.order.createOrder(userId)),

};

export default orderApis;
