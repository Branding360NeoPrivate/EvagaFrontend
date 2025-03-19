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
// import Home from "./pages/HomePage";
// import SinglePackage from "./pages/SinglePackage";
// import UserLoginPage from "./pages/User/UserLoginPage";
// import VendorDashboard from "./pages/Vendor/VendorDashboard";
// import VendorSignUpPage from "./pages/Vendor/VendorSignUpPage";
// import VendorLoginPage from "./pages/Vendor/VendorLoginPage";
import DynamicNav from "./components/navbar/DynamicNav";
// import VendorProfile from "./pages/Vendor/VendorProfilePage";
// import VendorCreateService from "./pages/Vendor/VendorCreateService";
// import VendorOrderPage from "./pages/Vendor/VendorOrderPage";
// import VendorOrderDetailPage from "./pages/Vendor/VendorOrderDetailPage";
import Footer from "./components/Footer/Footer";
// import VendorForgotPasswordPage from "./pages/Vendor/VendorForgotPasswordPage";
// import AdminLoginPage from "./pages/Admin/AdminLoginPage";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
import GlobalLoader from "./components/Loaders/GlobalLoader";
// import VendorEditService from "./pages/Vendor/VendorEditService";
import { lazy, Suspense, useEffect } from "react";
import GoToTop from "./GoToTop";
// import SearchResultPage from "./pages/SearchResultPage ";
// import UserSignupPage from "./pages/User/UserSignupPage";
// import Wishlist from "./pages/Wishlist";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWishlist } from "./context/redux/slices/wishlistSlice";
import Cookies from "js-cookie";
// import UserForgotPassword from "./pages/User/UserForgotPassword";
// import InterestSelection from "./pages/InterestSelection";
// import UserProfile from "./pages/User/UserProfile";
// import PressRelease from "./pages/PressRelease";
// import CheckOut from "./pages/CheckOut";
// import AboutEvaga from "./pages/AboutEvaga";
// import RefundAndCancellation from "./pages/RefundAndCancellation";
// import TermsAndConditions from "./pages/TermsAndConditions";
// import FeedBack from "./pages/FeedBack";
// import CustomerService from "./pages/CustomerService";
// import PaymentPage from "./pages/PaymentPage";
// import OrderSucessPage from "./pages/OrderSucessPage";
// import OrderPage from "./pages/OrderPage";
// import UserOrderDetailPage from "./pages/userOrderDetailPage";
// import VendorService from "./pages/Vendor/VendorService";
// import PrivacyAndPolicy from "./pages/PrivacyAndPolicy";
// import Careers from "./pages/Careers";
// import AdvertisewithUs from "./pages/AdvertisewithUs";
import GlobalEventHandlers from "./utils/GlobalEventHandlers";
// import Blog from "./pages/Blog";
// import SingleBlogPage from "./pages/singleBlogPage";
const Home = lazy(() => import("./pages/HomePage"));
const SinglePackage = lazy(() => import("./pages/SinglePackage"));
const UserLoginPage = lazy(() => import("./pages/User/UserLoginPage"));
const VendorDashboard = lazy(() => import("./pages/Vendor/VendorDashboard"));
const VendorSignUpPage = lazy(() => import("./pages/Vendor/VendorSignUpPage"));
const VendorLoginPage = lazy(() => import("./pages/Vendor/VendorLoginPage"));
const VendorProfile = lazy(() => import("./pages/Vendor/VendorProfilePage"));
const VendorCreateService = lazy(() =>
  import("./pages/Vendor/VendorCreateService")
);
const VendorOrderPage = lazy(() => import("./pages/Vendor/VendorOrderPage"));
const VendorOrderDetailPage = lazy(() =>
  import("./pages/Vendor/VendorOrderDetailPage")
);
const VendorForgotPasswordPage = lazy(() =>
  import("./pages/Vendor/VendorForgotPasswordPage")
);
const VendorEditService = lazy(() =>
  import("./pages/Vendor/VendorEditService")
);
const AdminLoginPage = lazy(() => import("./pages/Admin/AdminLoginPage"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const SearchResultPage = lazy(() => import("./pages/SearchResultPage "));
const UserSignupPage = lazy(() => import("./pages/User/UserSignupPage"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const UserForgotPassword = lazy(() =>
  import("./pages/User/UserForgotPassword")
);
const UserProfile = lazy(() => import("./pages/User/UserProfile"));
const PressRelease = lazy(() => import("./pages/PressRelease"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const AboutEvaga = lazy(() => import("./pages/AboutEvaga"));
const RefundAndCancellation = lazy(() =>
  import("./pages/RefundAndCancellation")
);
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const FeedBack = lazy(() => import("./pages/FeedBack"));
const CustomerService = lazy(() => import("./pages/CustomerService"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const OrderSucessPage = lazy(() => import("./pages/OrderSucessPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const UserOrderDetailPage = lazy(() => import("./pages/userOrderDetailPage"));
const VendorService = lazy(() => import("./pages/Vendor/VendorService"));
const PrivacyAndPolicy = lazy(() => import("./pages/PrivacyAndPolicy"));
const Careers = lazy(() => import("./pages/Careers"));
const AdvertisewithUs = lazy(() => import("./pages/AdvertisewithUs"));
const Blog = lazy(() => import("./pages/Blog"));
const SingleBlogPage = lazy(() => import("./pages/singleBlogPage"));
const InterestSelection = lazy(() => import("./pages/InterestSelection"));
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
  // useEffect(() => {
  //   const handleWheel = (event) => {
  //     if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
  //       event.preventDefault();
  //     }
  //   };

  //   window.addEventListener("wheel", handleWheel, { passive: false });

  //   return () => {
  //     window.removeEventListener("wheel", handleWheel);
  //   };
  // }, []);
  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && <DynamicNav />}
      <GlobalEventHandlers>
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
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminLoginPage />
              </Suspense>
            }
            path={internalRoutes.adminLogin}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UserLoginPage />
              </Suspense>
            }
            path={internalRoutes.userLogin}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UserSignupPage />
              </Suspense>
            }
            path={internalRoutes.userSignup}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute allowedRoles={["user"]}>
                  <UserProfile />
                </ProtectedRoute>
              </Suspense>
            }
            path={internalRoutes.profile}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UserForgotPassword />
              </Suspense>
            }
            path={internalRoutes.userForgotPassword}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
            path={internalRoutes.home}
          />
          <Route
            element={<InterestSelection />}
            path={internalRoutes.interest}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SearchResultPage />
              </Suspense>
            }
            path={internalRoutes.searchresultPage}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Wishlist />
              </Suspense>
            }
            path={internalRoutes.wishlist}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CheckOut />
              </Suspense>
            }
            path={internalRoutes.checkout}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PaymentPage />
              </Suspense>
            }
            path={internalRoutes.payment}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <OrderSucessPage />
              </Suspense>
            }
            path={internalRoutes.orderStatus}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PressRelease />
              </Suspense>
            }
            path={internalRoutes.pressReleases}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AboutEvaga />
              </Suspense>
            }
            path={internalRoutes.aboutUs}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Blog />
              </Suspense>
            }
            path={internalRoutes.blog}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SingleBlogPage />
              </Suspense>
            }
            path={`${internalRoutes.singleBlog + "/:blogId"}`}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <RefundAndCancellation />
              </Suspense>
            }
            path={internalRoutes.cancellationPolicy}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <TermsAndConditions />
              </Suspense>
            }
            path={internalRoutes.TermsAndConditions}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivacyAndPolicy />
              </Suspense>
            }
            path={internalRoutes.privacyAndPolicy}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Careers />
              </Suspense>
            }
            path={internalRoutes.careers}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdvertisewithUs />
              </Suspense>
            }
            path={internalRoutes.advertiseWithUs}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <FeedBack />
              </Suspense>
            }
            path={internalRoutes.feedbackForm}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CustomerService />
              </Suspense>
            }
            path={internalRoutes.customerService}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <VendorService />
              </Suspense>
            }
            path={internalRoutes.vendorSupport}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <OrderPage />
              </Suspense>
            }
            path={internalRoutes.order}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UserOrderDetailPage />
              </Suspense>
            }
            path={`${internalRoutes.orderDetail + "/:orderId/:itemId"}`}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <VendorOrderDetailPage />
              </Suspense>
            }
            path={`${internalRoutes.vendorOrderDeatil + "/:orderId/:itemId"}`}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SinglePackage />
              </Suspense>
            }
            path={`${internalRoutes.SinglePackage + "/:serviceId/:packageId"}`}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <VendorSignUpPage />
              </Suspense>
            }
            path={internalRoutes.vendorSignup}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <VendorLoginPage />
              </Suspense>
            }
            path={internalRoutes.vendorLogin}
          />
          <Route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <VendorForgotPasswordPage />
              </Suspense>
            }
            path={internalRoutes.vendorForgotPassword}
          />
          {/* Vendor Protected Routes */}
          <Route
            path={internalRoutes.vendorDashboard}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorDashboard />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path={internalRoutes.vendorProfile}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorProfile />
                </ProtectedRoute>
              </Suspense>
            }
          />{" "}
          <Route
            path={internalRoutes.vendorCreateservice}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorCreateService />
                </ProtectedRoute>
              </Suspense>
            }
          />{" "}
          <Route
            path={`${internalRoutes.vendorEditservice}/:serviceId`}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorEditService />
                </ProtectedRoute>
              </Suspense>
            }
          />{" "}
          <Route
            path={internalRoutes.vendorOrders}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorOrderPage />
                </ProtectedRoute>
              </Suspense>
            }
          />{" "}
          <Route
            path={internalRoutes.vendorOrderDeatil}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute allowedRoles={["vendor"]}>
                  <VendorOrderDetailPage />
                </ProtectedRoute>
              </Suspense>
            }
          />
          {/* Admin Protected Routes */}
          <Route
            path={internalRoutes.adminDashboard}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              </Suspense>
            }
          />
        </Routes>
        {!noNavbarPaths.includes(location.pathname) && <Footer />}
      </GlobalEventHandlers>
    </>
  );
};

function App() {
  useEffect(() => {
    if (process.env.REACT_APP_Server === "production") {
      ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);
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
