import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { comment } from "@/models/comment";
import { task } from "@/models/Task";
import { user } from "@/models/User";
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
  }): Promise<comment | undefined> => {
    try {
      const response: AxiosResponse<comment, Error> = await axiosInstance.post(
        "/comentario",
        {
          contenido,
          authorId,
          tareaId,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const deleteComment = async (
    idTarea: string
  ): Promise<comment | undefined> => {
    try {
      const response: AxiosResponse<comment, Error> =
        await axiosInstance.delete(`/comentario/${idTarea}`);
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // TASKS COMMENTS

  const createTask = async (data: Partial<task>): Promise<task | undefined> => {
    try {
      const response: AxiosResponse<task, Error> = await axiosInstance.post(
        "/tarea",
        data
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const deleteTask = async (idTask: string): Promise<task | undefined> => {
    try {
      const response: AxiosResponse<task> = await axiosInstance.delete(
        `/tarea/${idTask}`
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getUserTasks = async (id: string): Promise<task[] | undefined> => {
    try {
      const response: AxiosResponse<task[]> = await axiosInstance.get(
        `/tarea/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getTaskComments = async (
    idTask: string
  ): Promise<comment[] | undefined> => {
    try {
      const response: AxiosResponse<comment[]> = await axiosInstance.get(
        `/comentario/${idTask}`
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const editTask = async (
    idTask: string,
    data: Partial<task>
  ): Promise<task | undefined> => {
    try {
      const response: AxiosResponse<task> = await axiosInstance.put(
        `/tarea/${idTask}`,
        data
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getAsignedTasks = async (
    idUser: string
  ): Promise<task[] | undefined> => {
    try {
      const response: AxiosResponse<task[]> = await axiosInstance.get(
        `/tarea/asigned/${idUser}`
      );
      return response.data;
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

  const getAllUsers = async (): Promise<user[] | undefined> => {
    try {
      const response: AxiosResponse<user[]> = await axiosInstance.get(
        "/user/all"
      );
      return response.data;
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
