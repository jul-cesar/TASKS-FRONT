import axios from "axios";

const BASEURL = "https://tacheee-8x8oenokg-jul-cesars-projects.vercel.app";

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
