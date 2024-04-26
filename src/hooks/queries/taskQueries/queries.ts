import useTaskRequest from "@/api/tasksRequests/tasks";
import { task } from "@/models/Task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const KEY: string = "tasks";

export const useTasks = (id: string) => {
  const { getUserTasks } = useTaskRequest();

  return useQuery<task[], AxiosError>({
    queryKey: [KEY, id],
    queryFn: async (): Promise<task[]> => {
      const data = await getUserTasks(id);
      if (!data) {
        throw new Error("Hubo un error al traer las tareas");
      }
      return data;
    },

    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const { createTask } = useTaskRequest();
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
  const { deleteTask } = useTaskRequest();
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
  const { editTask } = useTaskRequest();
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
