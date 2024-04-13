import { useContext, useEffect } from "react";
import CardSkeleton from "./loaders/CardSkeleton";
import { useAsignedTask } from "@/hooks/taskQueries";
import { UiContext } from "@/context/ui";
import AsignedCard from "./Card.tasks/AsignedCard";

const AsignedTasksList = () => {
  const { data: Asigns, status } = useAsignedTask();
  const AsignsList = Asigns?.data;

  const { setTareasLength } = useContext(UiContext);

  useEffect(() => {
    setTareasLength((prevState) => ({
      ...prevState,
      asignedTasks: AsignsList?.length ?? 0,
    }));
  }, [Asigns]);

  if (status === "pending") {
    return (
      <div className="flex gap-4 flex-wrap  m-4  justify-center">
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
    <div className="flex gap-4  flex-wrap sm:justify-center  justify-center m-4 ">
      {Array.isArray(AsignsList) &&
        AsignsList.map((tarea) => (
          <AsignedCard
            tareaInfo={tarea}
            key={tarea.id}
            createdAt={tarea.createdAt}
            titulo={tarea.titulo}
            descripcion={tarea.descripcion}
            prioridad={tarea.prioridad}
            fechaVencimiento={tarea.fechaVencimiento}
            estado={tarea.estado}
            owner={tarea.owner}
            asignado={tarea.asignado}
          />
        ))}
    </div>
  );
};

export default AsignedTasksList;
