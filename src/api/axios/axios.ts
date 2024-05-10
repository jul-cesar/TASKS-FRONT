import axios from "axios";

// const apiUrl = "https://tasks-api-bxyq.onrender.com";
const apiUrl = "http://localhost:3001";

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
