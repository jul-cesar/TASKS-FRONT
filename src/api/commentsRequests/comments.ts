import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { comment } from "@/models/comment";
import { AxiosResponse } from "axios";

const useCommentsRequests = () => {
  const axiosInstance = useAxiosPrivate();

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
        "/comment",
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
        await axiosInstance.delete(`/comment/${idTarea}`);
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getTaskComments = async (
    idTask: string
  ): Promise<comment[] | undefined> => {
    try {
      const response: AxiosResponse<comment[]> = await axiosInstance.get(
        `/comment/${idTask}`
      );
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return { createComment, deleteComment, getTaskComments };
};
export default useCommentsRequests;
