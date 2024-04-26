import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { task } from "@/models/Task";
import { AxiosResponse } from "axios";

const useTaskRequest = () => {
  const axiosInstance = useAxiosPrivate();
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
        `/tarea/team/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
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

  
  return { createTask, deleteTask, getUserTasks, editTask };
};
export default useTaskRequest;
