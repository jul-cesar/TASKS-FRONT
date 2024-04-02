import { task } from "@/types/Task";
import TaskCard from "./TaskCard";
import CardSkeleton from "./CardSkeleton";

type TasksListProps = {
  tasksList?: task[];
  isLoading: boolean;
};

const TasksList = ({ tasksList, isLoading }: TasksListProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center m-4 gap-4  flex-wrap">
        {!isLoading && Array.isArray(tasksList) ? (
          tasksList.map((tarea) => (
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
          ))
        ) : (
          <CardSkeleton />
        )}
      </div>
    </div>
  );
};

export default TasksList;
