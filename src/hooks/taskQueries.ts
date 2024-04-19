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

  return useQuery<comment[], AxiosError>({
    queryKey: [KEYCOMMENT, idTarea],
    queryFn: async (): Promise<comment[]> => {
      const data = await getTaskComments(idTarea);
      if (!data) {
        throw new Error("Error al traer comentarios");
      }
      return data;
    },
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
  return useMutation<void, Error>({
    mutationFn: async () => {
      await deleteComment(idComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEYCOMMENT] }),
        toast.info("Comentario eliminado");
    },
    onError: (error) => {
      toast.error(`Hubo un error al eliminar el comentario ${error.message}`);
    },
    onMutate: () => {
      toast.info("Eliminando comentario...");
    },
  });
};

// TASKS QUERIES

export const useTasks = () => {
  const { getUserTasks } = UseTasksReqs();
  const { currentUser } = useContext(Auth);
  const id = currentUser.id;
  return useQuery<task[], AxiosError>({
    queryKey: [KEY, id],
    queryFn: async (): Promise<task[]> => {
      const data = await getUserTasks(id);
      if (!data) {
        throw new Error("Hubo un error al traer las tareas");
      }
      return data;
    },
    staleTime: 1000 * 60 * 1,
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const { createTask } = UseTasksReqs();
  const queryClient = useQueryClient();
  return useMutation<void, Error, Partial<task>>({
    mutationFn: async (newTarea) => {
      await createTask(newTarea);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }),
        toast.success("Tarea creada con exito!");
    },
    onError: (error) => {
      toast.error(`Hubo un error al crear la tarea: ${error.message}`);
    },
    onMutate: () => {
      toast.info("Creando tarea...");
    },
  });
};

export const useDeleteTask = (idTask: string) => {
  const { deleteTask } = UseTasksReqs();
  const queryClient = useQueryClient();

  return useMutation<void, Error>({
    mutationFn: async () => {
      await deleteTask(idTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }),
        toast.info("Tarea eliminada");
    },
    onError: (error) => {
      toast.error(`Hubo un error al eliminar la tarea: ${error.message}`);
    },
    onMutate: () => {
      toast.info("Eliminando tarea...");
    },
  });
};

export const useEditTask = (idTask: string) => {
  const { editTask } = UseTasksReqs();
  const queryClient = useQueryClient();

  return useMutation<void, Error, Partial<task>>({
    mutationFn: async (newTarea) => {
      await editTask(idTask, newTarea);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] }),
        toast.info(`Tarea editada`);
    },
    onError: (error) => {
      toast.error(`Fallo al editar la tarea: ${error.message}`);
    },
    onMutate: () => {
      toast.info("Editando la tarea...");
    },
  });
};

export const useAsignedTask = () => {
  const { currentUser } = useContext(Auth);
  const id = currentUser.id;
  const { getAsignedTasks } = UseTasksReqs();
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

export const useGetAllUsers = () => {
  type getAllUsers = {
    data: user[];
  };
  const { getAllUsers } = UseTasksReqs();
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
