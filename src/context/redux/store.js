import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import vendorReducer from "./slices/vendorSlice";
import userReducer from "./slices/userSlice";
import packageReducer from "./slices/packageSlice";
import userWishlistReducer from "./slices/wishlistSlice";
import categoryReducer from "./slices/categorySlice";
import couponReducer from "./slices/couponsSlice";
import categoryFessReducer from "./slices/categoryFeesSlice";
import userCartReducer from "./slices/cartSlice";
import bannerReducer from "./slices/bannerSlice";
import userSearchReducer from "./slices/userSearchSlice";
import adminReducer from "./slices/adminSlice";
import adminActionsReducer from "./slices/adminActionsSlice";
import loaderReducer from "./slices/loaderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    vendor: vendorReducer,
    category: categoryReducer,
    banner: bannerReducer,
    userSearch: userSearchReducer,
    adminActions: adminActionsReducer,
    loader: loaderReducer,
    package: packageReducer,
    wishlist: userWishlistReducer,
    wishlist: userWishlistReducer,
    userProfile: userReducer,
    coupon: couponReducer,
    categoryFees: categoryFessReducer,
    cart: userCartReducer,
  },
  devTools: process.env.REACT_APP_Server === "development"?true:false,
});

export default store;
