// src/services/api/userApi.js

import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const userApi = {
  register: (userData) => apiService.post(apiEndpoints.user.register, userData),
  login: (credentials) => apiService.post(apiEndpoints.user.login, credentials),
  getProfile: () => apiService.get(apiEndpoints.user.getProfile),
  updateProfile: (userData) =>
    apiService.put(apiEndpoints.user.updateProfile, userData),
};

export default userApi;
