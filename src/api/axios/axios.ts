import axios from "axios";

// const BASEURL = "https://tasks-api-bxyq.onrender.com";
const apiUrl = import.meta.env.VITE_API;

export const axiosIn = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
