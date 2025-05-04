import { Navigate, useRoutes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
// import Home from "@/pages/home";
// import { Login } from "@/pages/auth";
import Register from "@/pages/auth/Register";
import { lazy } from "react";
//Aplicamos lazy loading a las rutas de la aplicacion
const Login = lazy(() => import("@/pages/auth/Login"));

const Home = lazy(() => import("@/pages/home"));

//Rutas de la aplicacion
export const AppRoutes = () => {
  const routesApp = [
    {
      path: "/auth",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        { index: true, element: <Navigate to="/home" /> },
        { path: "home", element: <Home /> },
      ],
    },
  ];
  const routes = useRoutes(routesApp);

  return routes;
};
