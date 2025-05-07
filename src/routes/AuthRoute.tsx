import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const AuthRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoute;
