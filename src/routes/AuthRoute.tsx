import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const AuthRoute = () => {
  const isLogged = useAuth(); 

  if (isLogged) {
    return <Navigate to="/" />
  }

  return <Outlet />;
};

export default AuthRoute;
