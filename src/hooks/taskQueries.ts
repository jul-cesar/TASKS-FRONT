import UseTasksReqs from "@/api/useTasksReqs";
import { Auth } from "@/context/auth";
import { comment } from "@/types/comment";
import { task } from "@/types/Task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "sonner";

const KEY: string = "tasks";

export const useGetComments = (idTarea: string) => {
  const { getTaskComments } = UseTasksReqs();
  type listaComments = {
    data: comment[];
  };
  return useQuery<listaComments>({
    queryKey: ["comments", idTarea],
    queryFn: (): any => getTaskComments(idTarea),
    enabled: !!idTarea,
  });
};

export const useCreateComment = async () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      newComentario: Omit<comment, "id" | "user" | "tarea" | "fecha">
    ) => {
      console.log(newComentario, "new");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] }),
        toast.success("Comentario agregado");
    },
  });
};

export const useTasks = () => {
  type useTasks = {
    data: task[];
  };
  const { getUserTasks } = UseTasksReqs();
  const { currentUser } = useContext(Auth);
  const id = currentUser.id;
  return useQuery<useTasks>({
    queryKey: [KEY, id],
    queryFn: (): any => getUserTasks(id),
    enabled: !!id,
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
