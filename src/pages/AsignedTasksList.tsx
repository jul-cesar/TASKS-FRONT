import { task } from "@/types/Task";
import TaskCard from "../components/TaskCard";
import CardSkeleton from "../components/loaders/CardSkeleton";

type AsignedTasksListProps = {
  asignedTasksList?: task[];
  status: string;
};

const AsignedTasksList = ({
  asignedTasksList,
  status,
}: AsignedTasksListProps) => {
  if (status === "pending") {
    return (
      <div className="w-full flex justify-center">
        <div className="flex justify-center m-4 gap-4 flex-wrap">
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
    <div className="flex items-center  justify-center m-4 gap-4  flex-wrap">
      {Array.isArray(asignedTasksList) &&
        asignedTasksList.map((tarea) => (
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
