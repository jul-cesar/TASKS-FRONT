import axios from "axios";

const BASEURL = "http://localhost:3001";

export const axiosIn = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
