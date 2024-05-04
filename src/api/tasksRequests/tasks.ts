import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { task } from "@/models/Task";
import { AxiosResponse } from "axios";

const useTaskRequest = () => {
  const axiosInstance = useAxiosPrivate();
  const createTask = async (data: Partial<task>): Promise<task | undefined> => {
    try {
      const response: AxiosResponse<task, Error> = await axiosInstance.post(
        "/task",
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
        `/task/${idTask}`
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
        `/task/${idTask}`,
        data
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return { createTask, deleteTask, editTask };
};
export default useTaskRequest;
