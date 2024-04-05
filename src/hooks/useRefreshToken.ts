import { axiosInstance } from "@/api/axios";
import { Auth } from "@/context/auth";
import { useContext } from "react";

const useRefreshToken = () => {
  const { setAuthTok } = useContext(Auth);

  const refresh = async () => {
    const response = await axiosInstance.get("/refresh");
    setAuthTok((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, token: response.data.accessToken };
    });
    return response.data.accessToken;
  };


  return refresh;
};

export default useRefreshToken;
