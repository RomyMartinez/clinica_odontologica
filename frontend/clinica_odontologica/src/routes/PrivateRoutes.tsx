import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { JSX } from "react";

export const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? page : <Navigate to="/login" />;
};
