import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const isLogged = useAuth();

  if (!isLogged) {
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
