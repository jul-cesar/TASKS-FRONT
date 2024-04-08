import { Auth } from "@/context/auth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { comment } from "@/types/comment";
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
      if (currentUser.id !== "") {
        const response = await axiosInstance.get(`/comentario/${idTask}`);
        return response;
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
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
  return {
    getTasks,
    getTaskComments,
    getUserTasks,
    createComment,
    deleteComment,
    deleteTask
  };
};

export default UseTasksReqs;
