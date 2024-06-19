import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Notification } from "@/models/notification";
import { AxiosResponse } from "axios";

const useNotificationsReqs = () => {
  const axiosInstance = useAxiosPrivate();

  const getUserNotifications = async (
    idUser: string
  ): Promise<Notification[] | undefined> => {
    try {
      const response: AxiosResponse<Notification[]> = await axiosInstance.get(
        `/notification/${idUser}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return { getUserNotifications };
};

export default useNotificationsReqs;
