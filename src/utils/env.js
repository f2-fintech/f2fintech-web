export const getEnv = (key, fallbackKey = "") => {
  if (typeof process !== "undefined" && process.env) {
    if (process.env[key]) return process.env[key];
    if (fallbackKey && process.env[fallbackKey]) return process.env[fallbackKey];
  }
  if (typeof import.meta !== "undefined" && import.meta.env) {
    if (import.meta.env[key]) return import.meta.env[key];
    if (fallbackKey && import.meta.env[fallbackKey]) return import.meta.env[fallbackKey];
  }
  return "";
};

export const getBaseUrl = () => {
  return getEnv("NEXT_PUBLIC_BASE_URL", "VITE_BASE_URL") || "http://localhost:8080/api/v1";
};
