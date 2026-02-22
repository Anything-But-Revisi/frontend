import axios from "axios";
import { normalizeApiError } from "./apiContract";

const DEFAULT_TIMEOUT = 15000;

const sanitizeBaseUrl = (value) => value.replace(/\/+$/, "");

export const getApiBaseUrl = () => {
  const rawValue = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!rawValue) {
    return "";
  }

  if (rawValue.startsWith("/")) {
    return sanitizeBaseUrl(rawValue);
  }

  try {
    const parsed = new URL(rawValue);
    return sanitizeBaseUrl(parsed.toString());
  } catch {
    console.warn(
      "Invalid VITE_API_BASE_URL. Falling back to same-origin relative paths.",
    );
    return "";
  }
};

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error)),
);
