import { lazy } from "react";
import CardSkeleton from "../loaders/CardSkeleton";
import { useAsignedTask } from "@/hooks/queries/asignedTaskQueries/queries";
const AsignedCard = lazy(() => import("./AsignedCard"));

const AsignedTasksList = () => {
  const { data: AsignsList, status } = useAsignedTask();

  if (status === "pending") {
    return (
      <div className="flex gap-4 flex-wrap  m-4  justify-center mt-20">
        <CardSkeleton />
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="w-full flex justify-center">
        <div className="flex justify-center m-4 gap-4 flex-wrap">
          <p>Hubo un error</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-4  flex-wrap sm:justify-center  justify-center m-4 mt-20 ">
      {AsignsList.length > 1 ? (
        AsignsList?.map((tarea) => (
          <AsignedCard taskInfo={tarea} key={tarea.id} />
        ))
      ) : (
        <p className="text-black">No tienes tareas asignadas</p>
      )}
    </div>
  );
};

export default AsignedTasksList;
