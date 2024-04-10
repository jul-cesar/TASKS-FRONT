import TaskCard from "./TaskCard";
import CardSkeleton from "./loaders/CardSkeleton";
import { useAsignedTask } from "@/hooks/taskQueries";

const AsignedTasksList = () => {
  const { data: Asigns, status } = useAsignedTask();
  const AsignsList = Asigns?.data;
  if (status === "pending") {
    return (
      <div className="w-full flex justify-center">
        <div className="flex gap-4 flex-wrap  m-4  sm:justify-end justify-center mt-20">
          <CardSkeleton />
        </div>
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
    <div className="flex gap-4 flex-wrap sm:justify-end m-4 justify-center ">
      {Array.isArray(AsignsList) &&
        AsignsList.map((tarea) => (
          <TaskCard
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
