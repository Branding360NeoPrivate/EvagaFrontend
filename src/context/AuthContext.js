// src/context/AuthContext.js
import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";
import { internalRoutes } from "../utils/internalRoutes";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginReducer, logoutReducer } from "./redux/slices/authSlice";
import vendorApi from "../services/vendorApi";
import userApi from "../services/userApi";
import notificationService from "../utils/notificationService";
import adminApi from "../services/adminApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [auth, setAuth] = useState({
    isAuthenticated: !!Cookies.get("accessToken"),
    role: Cookies.get("role") || null,
    accessToken: Cookies.get("accessToken") || null,
    userId: Cookies.get("userId") || null,
  });
  const allowedUserRoutes = [
    internalRoutes.home,
    internalRoutes.SinglePackage,
    internalRoutes.SinglePackage,
    internalRoutes.checkout,
    internalRoutes.wishlist,
  ];
  // Determine the dashboard route based on role
  const getDashboardRoute = (role) => {
    switch (role) {
      case "vendor":
        return internalRoutes.vendorDashboard;
      case "admin":
        return internalRoutes.adminDashboard;
      case "user":
        return internalRoutes.home;
      default:
        return internalRoutes.home;
    }
  };

  // const login = (accessToken, role, userId) => {
  //   // Save to state
  //   setAuth({ isAuthenticated: true, role, accessToken, userId });

  //   // Save to cookies
  //   Cookies.set("accessToken", accessToken, { expires: 1 });
  //   Cookies.set("role", role, { expires: 1 });
  //   Cookies.set("userId", userId, { expires: 1 });
  //   notificationService.success("Welcome to Evaga!");

  //   // Redirect to the respective dashboard
  //   const dashboardRoute = getDashboardRoute(role);
  //   navigate(dashboardRoute);
  // };


  const login = (accessToken, role, userId) => {
    // Save to state
    setAuth({ isAuthenticated: true, role, accessToken, userId });
  
    // Save to cookies
    Cookies.set("accessToken", accessToken, { expires: 1 });
    Cookies.set("role", role, { expires: 1 });
    Cookies.set("userId", userId, { expires: 1 });
    notificationService.success("Welcome to Evaga!");
  
    // Check if a redirect URL is provided
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("redirect");
  
    // Redirect to the respective page or dashboard
    if (redirectPath) {
      navigate(redirectPath);
    } else {
      const dashboardRoute = getDashboardRoute(role);
      navigate(dashboardRoute);
    }
  };
  
  const logout = async () => {
    try {
      // Call the appropriate logout API based on the user's role
      if (auth.role === "vendor") {
        await vendorApi.logout(auth.userId);
      } else if (auth.role === "user") {
        // Assuming there's a logout method in userApi, if not, you may need to add it
        console.log('inside elseif user');
        
        await userApi.logout(auth.userId);
      } else if (auth.role === "admin") {
        await adminApi.logout(auth.userId);
      }

      // Clear state and cookies
      setAuth({
        isAuthenticated: false,
        role: null,
        accessToken: null,
        userId: null,
      });
      Cookies.remove("accessToken");
      Cookies.remove("role");
      Cookies.remove("userId");

      // Dispatch logout action to Redux store
      dispatch(logoutReducer());

      navigate(internalRoutes.home);
      notificationService.success("Logged out successfully");
    } catch (error) {
      console.log("Logout failed:", error);
      notificationService.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    // Initialize state from cookies on app load
    setAuth({
      isAuthenticated: !!Cookies.get("accessToken"),
      role: Cookies.get("role") || null,
      accessToken: Cookies.get("accessToken") || null,
      userId: Cookies.get("userId") || null,
    });
    dispatch(
      loginReducer({
        role: Cookies.get("role") || null,
        accessToken: Cookies.get("accessToken") || null,
        userId: Cookies.get("userId") || null,
      })
    );

    // Redirect authenticated users trying to access login/signup to their dashboard
    if (auth.isAuthenticated) {
      const currentPath = location.pathname;
      if (
        currentPath.includes("login") ||
        currentPath.includes("signup") ||
        currentPath === internalRoutes.home
      ) {
        const dashboardRoute = getDashboardRoute(auth.role);
        navigate(dashboardRoute);
      }
    }
  }, [auth.isAuthenticated, auth.role, location.pathname, navigate]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
