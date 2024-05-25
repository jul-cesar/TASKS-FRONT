import axios from "axios";

const apiUrl = "https://tasks-api-lyart.vercel.app";
// const apiUrl = "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
