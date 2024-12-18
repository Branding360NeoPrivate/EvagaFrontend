// src/services/api/apiClient.js
import axios from "axios";
import Cookies from "js-cookie";
import { emitError } from "../utils/ErrorEmitter";

axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "An unexpected error occurred.";
    if (error.response) {
      errorMessage =
        error.response.data?.error ||
        `Error ${error.response.status}: ${error.response.statusText}`;
    }
    console.log("error caught in interceptor:", error);

    // Emit the error message
    emitError(errorMessage);

    throw new Error(errorMessage);
  }
);

export default apiClient;
