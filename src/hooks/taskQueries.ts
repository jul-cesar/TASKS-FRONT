import { axiosInstance } from "@/api/axios";
import UseTasksReqs from "@/api/useTasksReqs";
import { task } from "@/types/Task";
import { useMutation, useQuery } from "@tanstack/react-query";

const KEY: string = "tasks";

const { getTasks}  = UseTasksReqs();

export const useMutateTasks = () => {
  return useMutation({
    mutationFn: async () => {},
  });
};

export const useTasks = () => {
  return useQuery<task[]>({
    queryKey: ["tasks"],
    queryFn: () : any => getTasks(),
  });
};
