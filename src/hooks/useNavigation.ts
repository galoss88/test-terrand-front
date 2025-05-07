import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Custom hook para manejar la navegación en la aplicación
 * @returns Objeto con funciones de navegación
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navegar a una ruta específica
  const goTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  // Navegar a una ruta con parámetros
  const goToWithParams = useCallback(
    (path: string, params: Record<string, string>) => {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      navigate(`${path}?${queryParams.toString()}`);
    },
    [navigate]
  );

  // Navegar a una ruta con state
  const goToWithState = useCallback(
    <T extends object>(path: string, state: T) => {
      navigate(path, { state });
    },
    [navigate]
  );

  // Volver a la página anterior
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Ir a la página de inicio
  const goHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Recargar la página actual
  const refreshPage = useCallback(() => {
    navigate(0);
  }, [navigate]);

  // Obtener los parámetros de la URL actual
  const getQueryParams = useCallback(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  return {
    goTo,
    goToWithParams,
    goToWithState,
    goBack,
    goHome,
    refreshPage,
    getQueryParams,
    currentPath: location.pathname,
  };
};
