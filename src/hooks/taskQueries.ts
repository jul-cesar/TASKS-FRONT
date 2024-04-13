import UseTasksReqs from "@/api/useTasksReqs";
import { Auth } from "@/context/auth";
import { comment } from "@/models/comment";
import { task } from "@/models/Task";
import { user } from "@/models/User";
import { userInfo } from "@/models/user.info";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { toast } from "sonner";

const KEY: string = "tasks";
const KEYCOMMENT: string = "comments";

// COMMENTS QUERIES

export const useGetComments = (idTarea: string) => {
  const { getTaskComments } = UseTasksReqs();
  type listaComments = {
    data: comment[];
  };
  return useQuery<listaComments>({
    queryKey: [KEYCOMMENT, idTarea],
    queryFn: (): any => getTaskComments(idTarea),
    enabled: !!idTarea,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { createComment } = UseTasksReqs();

  return useMutation({
    mutationFn: async (
      newComentario: Omit<comment, "id" | "user" | "tarea" | "fecha">
    ) => {
      await createComment({
        contenido: newComentario.contenido,
        tareaId: newComentario.tareaId,
        authorId: newComentario.authorId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYCOMMENT] });
    },
    onMutate: () => toast.success("Comentario agregado"),
  });
};

export const useDeleteComment = (idComment: string) => {
  const queryClient = useQueryClient();
  const { deleteComment } = UseTasksReqs();
  return useMutation({
    mutationFn: async () => {
      await deleteComment(idComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYCOMMENT] });
    },
    onMutate: () => toast.info("Comentario eliminado"),
  });
};

// TASKS QUERIES

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
    staleTime: 1000 * 60 * 1,

    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const { createTask } = UseTasksReqs();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      newTarea: Omit<task, "asignado" | "owner" | "id" | "createdAt">
    ) => {
      await createTask(newTarea);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onMutate: () => toast.success("Tarea creada con exito!"),
  });
};

export const useDeleteTask = (idTask: string) => {
  const { deleteTask } = UseTasksReqs();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await deleteTask(idTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onMutate: () => toast.info("Tarea eliminada"),
  });
};

export const useEditTask = (idTask: string) => {
  const { editTask } = UseTasksReqs();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTarea: Omit<task, "owner" | "id" | "createdAt">) => {
      await editTask(idTask, newTarea);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onMutate: () => toast.info(`Tarea editada`),
  });
};

export const useAsignedTask = () => {
  type useAsigns = {
    data: task[];
  };
  const { currentUser } = useContext(Auth);
  const id = currentUser.id;
  const { getAsignedTasks } = UseTasksReqs();
  return useQuery<useAsigns>({
    queryKey: ["asigns", id],
    queryFn: (): any => getAsignedTasks(id),

    enabled: !!id,
  });
};

export const useGetAllUsers = () => {
  type getAllUsers = {
    data: user[];
  };
  const { getAllUsers } = UseTasksReqs();
  return useQuery<getAllUsers>({
    queryKey: ["users"],
    queryFn: (): any => getAllUsers(),
  });
};

export const useGetUserInfo = (id: string) => {
  const { getUserInfo } = UseTasksReqs();
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

//AUTH

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

type registerData = {
  nombre: string;
  email: string;
  password: string;
};

export const useRegister = () => {
  const { registerUser } = useContext(Auth);
  return useMutation({
    mutationFn: async (data: registerData) => {
      await registerUser(data.nombre, data.email, data.password);
    },
  });
};
