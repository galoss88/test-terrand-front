import { FetchParams } from "@/utils/api";
import { useAuth } from "./useAuth";

export function useFetchWithAuth<T>(
  cb: (params: FetchParams) => Promise<T>
): (params: FetchParams) => Promise<T> {
  const { token } = useAuth();

  return async (params: FetchParams) => {
    const merged: FetchParams = {
      ...params,
      headers: {
        ...(params.headers ?? {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
    return cb(merged);
  };
}
