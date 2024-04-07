import UseTasksReqs from "@/api/useTasksReqs";
import { Auth } from "@/context/auth";
import { task } from "@/types/Task";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const KEY: string = "tasks";

export const useMutateTasks = () => {
  return useMutation({
    mutationFn: async () => {},
  });
};

export const useTasks = () => {
  type useTasks = {
    data: task[];
  };
  const { getTasks } = UseTasksReqs();
  return useQuery<useTasks>({
    queryKey: ["tasks"],
    queryFn: (): any => getTasks(),
  });
};

export const useLogIn = () => {
  const { LogIn } = useContext(Auth);

  type dataLogin = {
    email: string;
    password: string;
  };

  return useMutation({
    mutationFn: async (data: dataLogin) => {
      await LogIn(data.email, data.password);
    },
  });
};
