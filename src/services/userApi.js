// src/services/api/userApi.js

import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";


const userApi = {
  register: (userData) => apiService.post(apiEndpoints.user.register, userData),
  login: (credentials) => apiService.post(apiEndpoints.user.login, credentials),
  googleLogin: (token) => apiService.post(apiEndpoints.user.googleLogin, token),
  resetpassword: (credentials, formData) =>
    apiService.post(apiEndpoints.user.resetpassword(credentials),  formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  logout: (userId) => apiService.post(apiEndpoints.user.logout(userId)),
  getProfile: () => apiService.get(apiEndpoints.user.getProfile),
  updateProfile: (userData) =>
    apiService.put(apiEndpoints.user.updateProfile, userData),
  sendUserOtp: (formData) =>
    apiService.post(apiEndpoints.user.sendOtpUser, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  verifyUserOtp: (formData) =>
    apiService.post(apiEndpoints.user.userVerifyOtp, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  userInterest: (formData) =>
    apiService.post(apiEndpoints.user.userInterest, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  userIntereststatus: () =>
    apiService.get(apiEndpoints.user.userIntereststatus),
  Wishlist: (userId) => apiService.get(apiEndpoints.user.wishlist(userId)),
  toggleWishlist: (userId, formData) =>
    apiService.post(apiEndpoints.user.toggelewishlist(userId), formData),
  getTotalUser: () => apiService.get(apiEndpoints.admin.getTotalUser),
  getUserProfile: (userId) => apiService.get(apiEndpoints.user.getUserprofile(userId)),
};

export default userApi;
