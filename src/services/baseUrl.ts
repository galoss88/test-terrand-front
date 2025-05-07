const rawUrl = import.meta.env.VITE_URL_BACKEND;
export const apiUrl = rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;
