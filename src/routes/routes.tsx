import { Suspense } from "react";
import { AppRoutes } from "./AppRoutes";
export interface IUserLogin {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

export const RoutesWithSuspense = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <AppRoutes />
    </Suspense>
  );
};
