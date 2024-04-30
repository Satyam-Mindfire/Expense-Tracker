import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { timeout } from "../constants/constant";
import { getGeneralApiProblem } from "./apiProblem";

// Initialize axios api instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: timeout,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can modify the request config here (e.g., add headers, authentication token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here before it's passed to the component
    return response;
  },
  (error) => {
    // Handle error responses here
    // For more read: https://github.com/axios/axios?tab=readme-ov-file#error-types
    const problem = getGeneralApiProblem(error);
    return Promise.reject(problem);
  },
);