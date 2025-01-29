import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import vendorReducer from "./slices/vendorSlice";
import userReducer from "./slices/userSlice";
import packageReducer from "./slices/packageSlice";
import userWishlistReducer from "./slices/wishlistSlice";
import categoryReducer from "./slices/categorySlice";
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
  },
  devTools: process.env.REACT_APP_Server === "development"?true:false,
});

export default store;
