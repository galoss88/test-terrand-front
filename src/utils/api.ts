export type FetchParams = {
  url: string;
  method?: string;
  body?: any;
  headers?: HeadersInit;
};

export async function fetchApi<T = any>({
  url,
  method = "GET",
  body,
  headers = {},
}: FetchParams): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} – ${res.statusText}`);
  }
  return (await res.json()) as T;
}
