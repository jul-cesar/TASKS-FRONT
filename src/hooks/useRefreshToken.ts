import axiosInstance, { axiosIn } from "@/api/axios";
import { Auth } from "@/context/auth";
import { useContext } from "react";

const useRefreshToken = () => {
  const { setAuthTok } = useContext(Auth);

  const refresh = async () => {
    const response = await axiosIn.get("/refresh");
    setAuthTok((prev) => {
      return { ...prev, token: response.data.accessToken };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
