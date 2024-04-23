import useUsersRequests from "@/api/usersRequests/users";
import { user } from "@/models/User";
import { userInfo } from "@/models/user.info";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetAllUsers = () => {
  type getAllUsers = {
    data: user[];
  };
  const { getAllUsers } = useUsersRequests();
  return useQuery<user[], AxiosError>({
    queryKey: ["users"],
    queryFn: async (): Promise<user[]> => {
      const data = await getAllUsers();
      if (!data) {
        throw new Error("Error to bring all users");
      }
      return data;
    },
  });
};

export const useGetUserInfo = (id: string) => {
  const { getUserInfo } = useUsersRequests();
  return useQuery<userInfo, AxiosError>({
    queryKey: ["user", id],
    queryFn: async (): Promise<userInfo> => {
      const data = await getUserInfo(id);
      if (!data) {
        throw new Error("User not found");
      }
      return data;
    },
    enabled: !!id,
  });
};
