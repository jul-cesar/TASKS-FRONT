import useAsignedTasksRequests from "@/api/asignedTasksRequests/asigns";
import { Auth } from "@/context/auth";
import { task } from "@/models/Task";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

export const useAsignedTask = () => {
  const { currentUser } = useContext(Auth);
  const id = currentUser.id;
  const getAsignedTasks = useAsignedTasksRequests();
  return useQuery<task[], AxiosError>({
    queryKey: ["asigns", id],
    queryFn: async (): Promise<task[]> => {
      const data = await getAsignedTasks(id);
      if (!data) {
        throw new Error("Error to bring asigned tasks");
      }
      return data;
    },
    enabled: !!id,
  });
};
