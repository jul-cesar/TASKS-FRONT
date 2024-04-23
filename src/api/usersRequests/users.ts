import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { user } from "@/models/User";
import { userInfo } from "@/models/user.info";
import { AxiosResponse } from "axios";

const useUsersRequests = () => {
  const axiosInstance = useAxiosPrivate();

  const getUserInfo = async (id: string): Promise<userInfo | undefined> => {
    try {
      const response: AxiosResponse<userInfo> = await axiosInstance.get(
        `/user/${id}`
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getAllUsers = async (): Promise<user[] | undefined> => {
    try {
      const response: AxiosResponse<user[]> = await axiosInstance.get(
        "/user/all"
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return {
    getUserInfo,
    getAllUsers,
  };
};
export default useUsersRequests;
