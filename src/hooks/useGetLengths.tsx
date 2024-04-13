import { Auth } from "@/context/auth";
import { UiContext } from "@/context/ui";
import { task } from "@/models/Task";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";

const useGetLengths = () => {
  const { currentUser } = useContext(Auth);
  const { setTareasLength, tareasLength } = useContext(UiContext);
  const id = currentUser.id;

  const queryClient = useQueryClient();

  const tasksQ = queryClient.getQueryData<{ data: task[] }>(["tasks", id]);
  const asignedQ = queryClient.getQueryData<{ data: task[] }>(["asigns", id]);

  useEffect(() => {
    setTareasLength((prevState) => ({
      ...prevState,
      myTasks: tasksQ?.data?.length ?? 0,
      asignedTasks: asignedQ?.data.length ?? 0,
    }));
  }, [tasksQ, asignedQ]);
  return tareasLength;
};

export default useGetLengths;
