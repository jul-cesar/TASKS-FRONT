import UseTasksReqs from "@/api/useTasksReqs";
import { task } from "@/types/Task";
import { useMutation, useQuery } from "@tanstack/react-query";

const KEY: string = "tasks";



export const useMutateTasks = () => {
  return useMutation({
    mutationFn: async () => {},
  });
};

export const useTasks = () => {
  type useTasks = {
    data: task[]
  }
  const { getTasks}  = UseTasksReqs();
  return useQuery<useTasks>({
    queryKey: ["tasks"],
    queryFn: () : any => getTasks(),
  });
};
