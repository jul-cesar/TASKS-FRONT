import useNotificationsReqs from "@/api/notificationsRequest/notis";
import { Notification } from "@/models/notification";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const KEY: string = "notis";

export const useGetNotifications = (idUser: string) => {
  const { getUserNotifications } = useNotificationsReqs();
  return useQuery<Notification[], AxiosError>({
    queryKey: [KEY, idUser],
    queryFn: async (): Promise<Notification[]> => {
      const data = await getUserNotifications(idUser);
      if (!data) {
        throw new Error("error getting notis");
      }
      return data;
    },
    enabled: !!idUser,
  });
};
