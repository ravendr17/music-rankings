const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("ENV: VITE_API_BASE_URL NOT SET");
}

export const env = {
  API_BASE_URL: apiBaseUrl
};