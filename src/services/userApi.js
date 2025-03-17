// src/services/api/userApi.js

import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const userApi = {
  register: (userData) => apiService.post(apiEndpoints.user.register, userData),
  login: (credentials) => apiService.post(apiEndpoints.user.login, credentials),
  googleLogin: (token) => apiService.post(apiEndpoints.user.googleLogin, token),
  resetpassword: (credentials, formData) =>
    apiService.post(apiEndpoints.user.resetpassword(credentials), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  logout: (userId) => apiService.post(apiEndpoints.user.logout(userId)),
  getProfile: () => apiService.get(apiEndpoints.user.getProfile),
  updateProfile: (userId, formData) =>
    apiService.put(apiEndpoints.user.updateUserProfile(userId), formData),
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
  getTotalUser: (queryParams) => apiService.get(apiEndpoints.admin.getTotalUser,queryParams),
  getUserProfile: (userId) =>
    apiService.get(apiEndpoints.user.getUserprofile(userId)),
  addUserAdress: (userId, formData) =>
    apiService.post(apiEndpoints.user.addUserAdress(userId), formData),
  getOneAddress: (addressId) =>
    apiService.get(apiEndpoints.user.getOneAddress(addressId)),
  updateOneAddress: (addressId, formData) =>
    apiService.put(apiEndpoints.user.updateOneAddress(addressId), formData),
  deleteOneAddress: (addressId) =>
    apiService.delete(apiEndpoints.user.deleteOneAddress(addressId)),
  getUserAllAddress: (userId) =>
    apiService.get(apiEndpoints.user.getUserAllAddress(userId)),
  selectOneUserAddress: (userId, addressId) =>
    apiService.post(apiEndpoints.user.selectOneUserAddress(userId, addressId)),
  getUserSelectedAddress: (userId) =>
    apiService.get(apiEndpoints.user.getUserSelectedAddress(userId)),
  addPackageToUserCart: (userId, formData) =>
    apiService.post(apiEndpoints.user.addToCart(userId), formData),
  getUserCart: (userId) =>
    apiService.get(apiEndpoints.user.getUserCart(userId)),
  RemoveFromCart: (userId, packageId) =>
    apiService.post(apiEndpoints.user.removeFromCart(userId, packageId)),
  GetRecentViewpackage: (userId) =>
    apiService.get(apiEndpoints.user.getRecentViewpackage(userId)),
  GetRecentViewpackage: (userId) =>
    apiService.get(apiEndpoints.user.getRecentViewpackage(userId)),
  AddRecentView: (formdata) =>
    apiService.post(apiEndpoints.user.addRecentView, formdata),
  SuggestSimilarServices: (formdata) =>
    apiService.post(apiEndpoints.user.suggestSimilarServices, formdata),
  getAllBlog: () => apiService.post(apiEndpoints.user.getAllBlog),
  getOneBlog: (blogId) => apiService.post(apiEndpoints.user.getOneBlog(blogId)),
};

export default userApi;
