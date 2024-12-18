import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import vendorReducer from "./slices/vendorSlice";
import categoryReducer from "./slices/categorySlice";
import bannerReducer from "./slices/bannerSlice";
import userSearchReducer from "./slices/userSearchSlice";
import adminReducer from "./slices/adminSlice";
import adminActionsReducer from "./slices/adminActionsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    vendor: vendorReducer,
    category: categoryReducer,
    banner: bannerReducer,
    userSearch: userSearchReducer,
    adminActions: adminActionsReducer,
  },
});

export default store;
