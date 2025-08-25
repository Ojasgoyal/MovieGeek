import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useAxios = () => {
  const { user, login, logout } = useAuth();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // send refresh token cookie
  });

  // Request interceptor: attach access token
  axiosInstance.interceptors.request.use(
    (config) => {
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      if (stored?.accessToken) {
        config.headers["Authorization"] = `Bearer ${stored.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor: handle token refresh on 401
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Refresh access token
          const { data } = await axios.post(
            `${BASE_URL}/refresh`,
            {},
            { withCredentials: true }
          );
          const existingUser = JSON.parse(localStorage.getItem("user")) || {};
          login({accessToken: data.accessToken , user: { username: existingUser.username }});

          originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          logout();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
