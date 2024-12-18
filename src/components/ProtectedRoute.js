// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
