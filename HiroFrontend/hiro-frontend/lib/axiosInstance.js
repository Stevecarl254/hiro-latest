import axios from "axios";

const rawBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // frontend host
let baseURL = rawBase.replace(/\/+$/g, ""); // remove trailing slash

const axiosInstance = axios.create({
  baseURL,
});

// Add token to every request automatically
axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("authToken")
    : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle expired tokens automatically
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Token invalid or expired
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;