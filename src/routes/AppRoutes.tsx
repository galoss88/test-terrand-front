import Register from "@/pages/auth/Register";
import Detail from "@/pages/recipes/detail/Detail";
import MyRecipes from "@/pages/recipes/myRecipes/index";
import { lazy } from "react";
import { useRoutes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
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
        { index: true, element: <Home /> },
        {
          path: "/myRecipes",
          element: <MyRecipes />,
        },
        {
          path: "myRecipes/detail/:id",
          element: <Detail />,
        },
      ],
    },
  ];
  const routes = useRoutes(routesApp);

  return routes;
};
