import useCommentsRequests from "@/api/commentsRequests/comments";
import { comment } from "@/models/comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const KEYCOMMENT: string = "comments";

export const useGetComments = (idTarea: string) => {
  const { getTaskComments } = useCommentsRequests();

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
  const { createComment } = useCommentsRequests();

  return useMutation({
    mutationFn: async (
      newComentario: Omit<comment, "id" | "user" | "task" | "createdAt">
    ) => {
      await createComment({
        contenido: newComentario.content,
        tareaId: newComentario.content,
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
  const { deleteComment } = useCommentsRequests();
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
