import { type IUserLogin } from "@/types";
import { getLocalStorage } from "@/utils/getLocalStorage";

export const useAuth = () => {
  const user = !!getLocalStorage<IUserLogin>({
    name: "userLogin",
  });
  const tokenUser = !!localStorage.getItem("authToken");
  const isLogin = tokenUser && user;

  return isLogin;
};
