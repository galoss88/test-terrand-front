import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const isLogged = false;

  if (!isLogged) {
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
