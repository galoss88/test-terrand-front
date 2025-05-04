import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const isLogged = true;

  if (!isLogged) {
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
