import { Auth } from "@/context/auth";
import  { useContext, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import axiosInstance from "@/api/axios";

const useAxiosPrivate = () => {
  const { authTok } = useContext(Auth);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers[`Authorization`]) {
          config.headers["Authorization"] = `Bearer ${authTok?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterecept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest.sent)
          prevRequest.sent = true;
        const newAccessToken = await refresh();
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(prevRequest);
      }
    );
    return () => {
      axiosInstance.interceptors.response.eject(responseInterecept);
      axiosInstance.interceptors.request.eject(requestIntercept);
    };
  }, [authTok, refresh]);

  return axiosInstance;
};

export default useAxiosPrivate;
