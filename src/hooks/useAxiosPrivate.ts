import { useContext, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import axiosInstance from "@/api/axios/axios";
import { Auth } from "@/context/auth";

const useAxiosPrivate = () => {
  const { authTok } = useContext(Auth);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authTok?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          if (prevRequest.retryCount && prevRequest.retryCount >= 2) {
            return Promise.reject(error);
          }
          prevRequest.sent = true;
          prevRequest.retryCount = (prevRequest.retryCount || 0) + 1;

          try {
            const newAccessToken = await refresh();
            if (newAccessToken) {
              prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return axiosInstance(prevRequest);
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseIntercept);
      axiosInstance.interceptors.request.eject(requestIntercept);
    };
  }, [authTok, refresh]);

  return axiosInstance;
};

export default useAxiosPrivate;
