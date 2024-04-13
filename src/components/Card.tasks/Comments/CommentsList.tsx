import { comment } from "../../../models/comment";
import { formatCustomDate } from "@/utils/formatCustomDate";
import CommentsOptions from "./CommentsOptions";
import { AvatarComments } from "./AvatarComments";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import LoaderMedium from "@/components/loaders/LoaderMedium";

type CommentsListProps = {
  listaComentarios: comment[];
  isLoading: boolean;
};

const CommentsList = ({
  listaComentarios,

  isLoading,
}: CommentsListProps) => {
  const [parent] = useAutoAnimate();

  return (
    <div className="m-3" ref={parent}>
      {!isLoading && Array.isArray(listaComentarios) ? (
        listaComentarios.map((comentario) => (
          <div className="flex items-start gap-2" key={comentario.id}>
            <AvatarComments
              src={comentario?.user?.photoURL}
              author={comentario?.user}
            />
            <div className="flex flex-col w-[210px] max-w-[720px] sm:w-[720px] leading-1.5 p-4 m-2 border-gray-200  rounded-e-xl rounded-es-xl bg-primary">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-background">
                  {comentario.user.nombre}
                </span>
                <span className="text-xs font-normal text-gray-400 ">
                  {" "}
                  {formatCustomDate(comentario.fecha)}
                </span>
              </div>
              <p className="text-sm font-normal py-2.5 text-background max-w-[720px]  truncate">
                {comentario.contenido}
              </p>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400"></span>
            </div>
            <button className="inline-flex self-center items-center p-2 text-sm font-medium text-center">
              <CommentsOptions comentarioData={comentario} />
            </button>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center">
        <LoaderMedium />
        </div>
      )}
    </div>
  );
};

export default CommentsList;
