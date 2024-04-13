import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { task } from "@/models/Task";
import { userInfo } from "@/models/user.info";
import { AxiosResponse } from "axios";

// COMMENTS HOOKS

const UseTasksReqs = () => {
  const axiosInstance = useAxiosPrivate();

  // COMMENTS FNS

  const createComment = async ({
    contenido,
    authorId,
    tareaId,
  }: {
    contenido: string;
    authorId: string;
    tareaId: string;
  }) => {
    const response = await axiosInstance.post("/comentario", {
      contenido,
      authorId,
      tareaId,
    });
    return response;
  };

  const deleteComment = async (idTarea: string) => {
    try {
      const response = await axiosInstance.delete(`/comentario/${idTarea}`);
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // TASKS COMMENTS

  const createTask = async (
    data: Omit<task, "asignado" | "owner" | "id" | "createdAt">
  ) => {
    try {
      const response = await axiosInstance.post("/tarea", data);
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const deleteTask = async (idTask: string) => {
    try {
      const response = await axiosInstance.delete(`/tarea/${idTask}`);
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getUserTasks = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/tarea/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getTaskComments = async (idTask: string) => {
    try {
      const response = await axiosInstance.get(`/comentario/${idTask}`);
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const editTask = async (
    idTask: string,
    data: Omit<task, "asignado" | "owner" | "id" | "createdAt">
  ) => {
    try {
      const response = await axiosInstance.put(`/tarea/${idTask}`, data);
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getAsignedTasks = async (idUser: string) => {
    try {
      const response = await axiosInstance.get(`/tarea/asigned/${idUser}`);
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getUserInfo = async (id: string): Promise<userInfo | undefined> => {
    try {
      const response: AxiosResponse<userInfo> = await axiosInstance.get(
        `/user/${id}`
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/user/all");
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return {
    getTaskComments,
    getUserTasks,
    createComment,
    deleteComment,
    deleteTask,
    createTask,
    editTask,
    getAsignedTasks,
    getAllUsers,
    getUserInfo,
  };
};

export default UseTasksReqs;
