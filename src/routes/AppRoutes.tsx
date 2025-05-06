import Register from "@/pages/auth/Register";
import Create from "@/pages/recipes/create";
import DetailRecipe from "@/pages/recipes/detail/DetailRecipe";
import EditRecipe from "@/pages/recipes/edit";
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
          element: <DetailRecipe />,
        },
        {
          path: "myRecipes/create",
          element: <Create />,
        },
        {
          path: "myRecipes/edit/:id",
          element: <EditRecipe />,
        },
      ],
    },
  ];
  const routes = useRoutes(routesApp);

  return routes;
};
