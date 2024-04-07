import { Auth } from "@/context/auth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useContext } from "react";

const UseTasksReqs = () => {
  const axiosInstance = useAxiosPrivate();
  const { currentUser } = useContext(Auth);
  const getTasks = async () => {
    try {
      const response = await axiosInstance.get("/tarea");
      return response;
    } catch (error) {
      console.error(error);
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
      if (currentUser.id !== "") {
        const response = await axiosInstance.get(`/comentario/${idTask}`);
        return response;
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return {
    getTasks,
    getTaskComments,
    getUserTasks,
  };
};

export default UseTasksReqs;
