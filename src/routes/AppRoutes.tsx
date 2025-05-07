import { MuiLoading } from "@/components/Material/MuiLoading";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router";

// Lazy imports de **todas** las páginas/layout
const AuthRoute = lazy(() => import("./AuthRoute"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const Layout = lazy(() => import("@/layout/Layout"));

const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));

const Home = lazy(() => import("@/pages/home"));
const MyRecipes = lazy(() => import("@/pages/recipes/myRecipes/index"));
const DetailRecipe = lazy(() => import("@/pages/recipes/detail/DetailRecipe"));
const CreateRecipe = lazy(() => import("@/pages/recipes/create"));
const EditRecipe = lazy(() => import("@/pages/recipes/edit"));

export const AppRoutes = () => {
  const routesConfig = [
    {
      path: "/auth",
      element: <AuthRoute />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            { index: true, element: <Home /> },
            { path: "myRecipes", element: <MyRecipes /> },
            { path: "myRecipes/detail/:id", element: <DetailRecipe /> },
            { path: "myRecipes/create", element: <CreateRecipe /> },
            { path: "myRecipes/edit/:id", element: <EditRecipe /> },
          ],
        },
      ],
    },
  ];

  const routes = useRoutes(routesConfig);

  return (
    <Suspense fallback={<MuiLoading>Cargando</MuiLoading>}>{routes}</Suspense>
  );
};
