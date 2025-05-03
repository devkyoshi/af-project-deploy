import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Spin } from "antd";
import { useAuth } from "../contexts/auth-context.jsx";

export const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center h-screen">
        <Spin size="large" />
        <p className={"mt-2 text-blue-400 font-semibold"}>Authenticating</p>
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};
