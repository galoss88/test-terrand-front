import { Suspense } from "react";
import { AppRoutes } from "./AppRoutes";

export const RoutesWithSuspense = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <AppRoutes />
    </Suspense>
  );
};
