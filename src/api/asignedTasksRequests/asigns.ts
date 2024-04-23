import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { task } from "@/models/Task";
import { AxiosResponse } from "axios";

const useAsignedTasksRequests = () => {
    const axiosInstance = useAxiosPrivate();

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
  return getAsignedTasks;
};
export default useAsignedTasksRequests;
