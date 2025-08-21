import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useAxios = () => {
  const { user, login, logout } = useAuth();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // send refresh token cookie
  });

  // Request interceptor: attach access token
  axiosInstance.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers["Authorization"] = `Bearer ${user.accessToken}`;
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
            "http://localhost:5000/api/refresh",
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
