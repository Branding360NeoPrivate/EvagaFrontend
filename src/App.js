import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { internalRoutes } from "./utils/internalRoutes";
import { ToastContainer } from "react-toastify";
import ErrorHandler from "./components/Errors/ErrorHandler";
import { ErrorProvider } from "./context/ErrorContext";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/HomePage";
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

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorProvider>
          <ErrorHandler />
          <DynamicNav />
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
          <Routes>
            {/* Public Routes */}
            <Route
              element={<AdminLoginPage />}
              path={internalRoutes.adminLogin}
            />
            <Route
              element={<UserLoginPage />}
              path={internalRoutes.userLogin}
            />
            <Route element={<Home />} path={internalRoutes.home} />
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
          <Footer />
        </ErrorProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
