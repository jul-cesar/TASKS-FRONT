import React from "react";
import { comment } from "../types/comment";
import { user } from "../types/User";

type CommentsListProps = {
  listaComentarios: comment[];
  isLoading: boolean;
  currentUser: user;
};

const CommentsList = ({
  listaComentarios,
  currentUser,
  isLoading,
}: CommentsListProps) => {
  return <div>CommentsList</div>;
};

export default CommentsList;
