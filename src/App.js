import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { internalRoutes } from "./utils/internalRoutes";
import { ToastContainer } from "react-toastify";
import ErrorHandler from "./components/Errors/ErrorHandler";
import { ErrorProvider } from "./context/ErrorContext";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga4";
import Home from "./pages/HomePage";
import SinglePackage from "./pages/SinglePackage";
import UserLoginPage from "./pages/User/UserLoginPage";
import VendorDashboard from "./pages/Vendor/VendorDashboard";
import VendorSignUpPage from "./pages/Vendor/VendorSignUpPage";
import VendorLoginPage from "./pages/Vendor/VendorLoginPage";
import DynamicNav from "./components/navbar/DynamicNav";
import VendorProfile from "./pages/Vendor/VendorProfilePage";
import VendorCreateService from "./pages/Vendor/VendorCreateService";
import VendorOrderPage from "./pages/Vendor/VendorOrderPage";
import VendorOrderDetailPage from "./pages/Vendor/VendorOrderDetailPage";
import Footer from "./components/Footer/Footer";
import VendorForgotPasswordPage from "./pages/Vendor/VendorForgotPasswordPage";
import AdminLoginPage from "./pages/Admin/AdminLoginPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import GlobalLoader from "./components/Loaders/GlobalLoader";
import VendorEditService from "./pages/Vendor/VendorEditService";
import { useEffect } from "react";
import usePageTracking from "./hooks/usePageTracking";
import GoToTop from "./GoToTop";
import SearchResultPage from "./pages/SearchResultPage ";
import UserSignupPage from "./pages/User/UserSignupPage";
import Wishlist from "./pages/Wishlist";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWishlist } from "./context/redux/slices/wishlistSlice";
import Cookies from "js-cookie";
import UserForgotPassword from "./pages/User/UserForgotPassword";
import InterestSelection from "./pages/InterestSelection";
import UserProfile from "./pages/User/UserProfile";
import PressRelease from "./pages/PressRelease";
import CheckOut from "./pages/CheckOut";
import AboutEvaga from "./pages/AboutEvaga";
import RefundAndCancellation from "./pages/RefundAndCancellation";
import TermsAndConditions from "./pages/TermsAndConditions";
import FeedBack from "./pages/FeedBack";
const AppContent = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = Cookies.get("userId");
  const { allWishlist } = useSelector((state) => state.wishlist);
  const noNavbarPaths = [
    internalRoutes.userSignup,
    internalRoutes.userLogin,
    internalRoutes.adminSignup,
    internalRoutes.adminLogin,
    internalRoutes.vendorLogin,
    internalRoutes.vendorSignup,
    internalRoutes.vendorForgotPassword,
    internalRoutes.userForgotPassword,
    internalRoutes.adminDashboard,
    internalRoutes.interest,
  ];
  useEffect(() => {
    if (
      auth?.isAuthenticated &&
      auth?.role === "user" &&
      allWishlist?.length === 0
    ) {
      dispatch(fetchUserWishlist(userId));
    }
  }, [auth, allWishlist, userId, dispatch]);
  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && <DynamicNav />}

      <GlobalLoader />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <GoToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<AdminLoginPage />} path={internalRoutes.adminLogin} />
        <Route element={<UserLoginPage />} path={internalRoutes.userLogin} />
        <Route element={<UserSignupPage />} path={internalRoutes.userSignup} />
        <Route
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserProfile />
            </ProtectedRoute>
          }
          path={internalRoutes.profile}
        />
        <Route
          element={<UserForgotPassword />}
          path={internalRoutes.userForgotPassword}
        />
        <Route element={<Home />} path={internalRoutes.home} />
        <Route element={<InterestSelection />} path={internalRoutes.interest} />
        <Route
          element={<SearchResultPage />}
          path={internalRoutes.searchresultPage}
        />
        <Route element={<Wishlist />} path={internalRoutes.wishlist} />
        <Route element={<CheckOut />} path={internalRoutes.checkout} />
        <Route element={<PressRelease />} path={internalRoutes.pressReleases} />
        <Route element={<AboutEvaga />} path={internalRoutes.aboutUs} />
        <Route element={<RefundAndCancellation />} path={internalRoutes.cancellationPolicy} />
        <Route element={<TermsAndConditions />} path={internalRoutes.TermsAndConditions} />
        <Route element={<FeedBack />} path={internalRoutes.feedbackForm} />
        <Route
          element={<SinglePackage />}
          path={`${internalRoutes.SinglePackage + "/:serviceId/:packageId"}`}
        />
        <Route
          element={<VendorSignUpPage />}
          path={internalRoutes.vendorSignup}
        />
        <Route
          element={<VendorLoginPage />}
          path={internalRoutes.vendorLogin}
        />
        <Route
          element={<VendorForgotPasswordPage />}
          path={internalRoutes.vendorForgotPassword}
        />
        {/* Vendor Protected Routes */}
        <Route
          path={internalRoutes.vendorDashboard}
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={internalRoutes.vendorProfile}
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorProfile />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path={internalRoutes.vendorCreateservice}
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorCreateService />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path={`${internalRoutes.vendorEditservice}/:serviceId`}
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorEditService />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path={internalRoutes.vendorOrders}
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorOrderPage />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path={internalRoutes.vendorOrderDeatil}
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorOrderDetailPage />
            </ProtectedRoute>
          }
        />
        {/* Admin Protected Routes */}
        <Route
          path={internalRoutes.adminDashboard}
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route
  path={internalRoutes.adminDashboard}
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/> */}
      </Routes>
      {!noNavbarPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  useEffect(() => {
    if (process.env.REACT_APP_Server === "production") {
      ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID); // Replace with your Measurement ID
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ErrorProvider>
          <ErrorHandler />
          <AppContent />
        </ErrorProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
