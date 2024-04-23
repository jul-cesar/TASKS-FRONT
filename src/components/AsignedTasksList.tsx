import CardSkeleton from "./loaders/CardSkeleton";
import AsignedCard from "./Card.tasks/AsignedCard";
import { useAsignedTask } from "@/hooks/queries/asignedTaskQueries/queries";

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
