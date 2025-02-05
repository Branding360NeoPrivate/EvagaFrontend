// src/constants/apiEndpoints.js

const apiEndpoints = {
  // Vendor-related endpoints
  vendor: {
    register: "vender/registerVender",
    login: "vender/loginVender",
    logout: (vendorId) => `vender/logoutVender/${vendorId}`,
    changePassword: (vendorId) => `vender/changeVenderPassword/${vendorId}`,
    deleteAccount: (vendorId) => `vender/deleteVenderProfile/${vendorId}`,
    getProfile: (vendorId) => `vender/getVenderProfileAllInOne/${vendorId}`,
    updateProfile: (vendorId) => `vender/updateVender/${vendorId}`,
    updateBankDetails: (vendorId) =>
      `vender/updateVendorBankDetails/${vendorId}`,
    uploadDocuments: (vendorId) => `vender/uploadVendorDocuments/${vendorId}`,
    updateBio: (vendorId) => `vender/updateVenderBio/${vendorId}`,
    updateProfilePicture: (vendorId) =>
      `vender/updateVenderProfilePicture/${vendorId}`,

    updateCalendar: (vendorId) => `vender/updateVenderCalender/${vendorId}`,
    editVendorCalenderBooking: (bookingId) =>
      `vender/editVendorCalender/${bookingId}`,

    updateBusiness: (vendorId) => `vender/updateVenderBusiness/${vendorId}`,
    addNewCategoryBusiness: (businessId) =>
      `vender/addNewCategoryvenderBusinessDeatils/${businessId}`,
    getProfilePercentage: (vendorId) =>
      `vender/getVendorProfilePercentage/${vendorId}`,
    // getAllMonthlyBooking: (vendorId) => `vender/getBookingByMonth/${vendorId}`,
    getAllMonthlyBooking: (vendorId) => `vender/getBookingByMonth/${vendorId}`,
    getSelectedCategoryAndSubCategoryForm: (categoryId, subCategoryId) =>
      `form/get-one-event-form-with-category/${categoryId}/${subCategoryId}`,
    addNewServiceVendor: (vendorId) =>
      `vender/createService/add-new-service/${vendorId}`,
    updateServiceVendor: (serviceId) =>
      `vender/createService/update-one-service/${serviceId}`,
    getOneVendorService: (serviceId) =>
      `vender/createService/get-one-service/${serviceId}`,
    getAllVendorServiceById: (vendorId) =>
      `vender/createService/get-all-service-by-vendorId/${vendorId}`,
    addVendorCalenderBooking: (vendorId) =>
      `vender/updateVenderCalender/${vendorId}`,
    vendorForgotPassword: `vender/forgot-password`,
    vendorVerifyOtp: `vender/verify-One-time-password`,
    vendorChangePassword: (vendorId) => `vender/set-new-password/${vendorId}`,
    acceptTermsAndCondition: (vendorId) =>
      `vender/accept-terms-and-condition/${vendorId}`,
    acceptOrRejectpackage: (serviceId, packageId) =>
      `vender/createService/verify-one-service/${serviceId}/${packageId}`,
  },

  // User-related endpoints
  user: {
    register: "user/registerUser",
    login: "user/loginUser",
    googleLogin: "user/auth/google",
    logout: (userId) => `user/logoutUser/${userId}`,
    updateUserProfile: (userId) => `user/updateUser/${userId}`,
    resetpassword: (userId) => `user/set-user-new-password/${userId}`,
    getProfile: "user/profile",
    updateProfile: "user/profile",
    sendOtpUser: `user/forgot-password`,
    userVerifyOtp: `user/verify-One-time-password`,
    userInterest: `user/save-user-interest?interest`,
    userIntereststatus: `user/get-user-interest-status`,
    wishlist: (userId) => `wishlist/get-wishlist/${userId}`,
    toggelewishlist: (userId) => `wishlist/toggle-wishlist/${userId}`,
    getUserprofile: (userId) => `user/getUserProfile/${userId}`,
    addUserAdress: (userId) => `user/add-new-address/${userId}`,
    getOneAddress: (addressId) => `user/get-user-one-address/${addressId}`,
    updateOneAddress: (addressId) =>
      `user/update-user-one-address/${addressId}`,
    deleteOneAddress: (addressId) =>
      `user/delete-user-one-address/${addressId}`,
  },
  category: {
    add: "category",
    getAll: "categories",
    addSub: "addSubCategory",
    getSubCategoriesByCategory: (categoryId) =>
      `/getSubCategoriesByCategory/${categoryId}`,
  },
  common: {
    getAllBanner: () => "banner/get-all-banner",
    getUserBanner: () => "banner/get-user-banner",
    getVendorBanner: () => "banner/get-vendor-banner",
    addBanner: "banner/add-banner",
    updateOneBanner: "banner/update-one-banner/:bannerId",
    deleteOneBanner: "banner/delete-one-banner/:bannerId",
  },
  admin: {
    register: "admin/registerAdmin",

    login: "admin/loginAdmin",
    update: (userId) => `admin/updateAdmin/${userId}`,
    getOne: (userId) => `admin/getOneAdmin/${userId}`,
    changePassword: (userId) => `admin/changeAdminPassword/${userId}`,
    deleteProfile: (userId) => `admin/deleteAdminProfile/${userId}`,
    logout: (userId) => `admin/logoutAdmin/${userId}`,
    getTotalUser: "user/get-all-user",
 
  },
  adminActions: {
    getAllVendorsWithProfileStatusAndService:
      "adminAction/get-all-vendor-with-profile-status-and-no-of-service",
    verifyVendorDocument: (documentId) =>
      `adminAction/verify-vendor-document/${documentId}`,
    updateVendorBankDetailsByAdmin: (vendorID) =>
      `adminAction/update-vendor-bank-details/${vendorID}`,
    updateVendorBusinessDetailsByAdmin: (vendorID) =>
      `adminAction/update-vendor-business-details/${vendorID}`,
    updateVendorProfileUpdateByAdmin: (vendorID) =>
      `adminAction/update-vendor-profile-details/${vendorID}`,
    updateVendorBioUpdateByAdmin: (vendorID) =>
      `adminAction/update-vendor-bio-details/${vendorID}`,
    updateVendorProfilePicUpdateByAdmin: (vendorID) =>
      `adminAction/update-vendor-profilepic-details/${vendorID}`,
    addBanner: "banner/add-banner",
    editBanner:(bannerId) => `banner/update-one-banner/${bannerId}`,
    getOneBanner:(bannerId) => `banner/get-one-banner-by-id/${bannerId}`,
    deleteBanner:(bannerId) => `banner/delete-one-banner/${bannerId}`,
  },
  packages: {
    getAllPackages: () => "packages/get-all-packages",
    getOnePackage: (serviceId, packageId) =>
      `packages/get-one-package/${serviceId}/${packageId}`,
  },
};

export default apiEndpoints;
