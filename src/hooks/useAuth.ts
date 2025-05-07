import { getLocalStorage } from "@/utils/getLocalStorage";

export const useAuth = () => {
  const userData = getLocalStorage<any>({
    name: "userLogin",
  });

  const tokenAuth = getLocalStorage<string>({
    name: "authToken",
  });

  const isAuthenticated = !!tokenAuth;

  const logout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("authToken");
  };

  return {
    user: userData,
    token: tokenAuth,
    isAuthenticated,
    logout,
  };
};
