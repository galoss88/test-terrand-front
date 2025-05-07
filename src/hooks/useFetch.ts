import { useCallback, useState } from "react";
import { fetchApi, FetchParams } from "../utils/api";
import { useAuth } from "./useAuth";

export function useFetch<T = any>() {
  const { token } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (params: FetchParams) => {
      setLoading(true);
      setError(null);
      try {
        const json = await fetchApi<T>({
          ...params,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        });
        setData(json);
        return json;
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { data, loading, error, fetchData };
}
