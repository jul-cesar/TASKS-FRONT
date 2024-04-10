import { task } from "@/types/Task";
import TaskCard from "./TaskCard";
import CardSkeleton from "./loaders/CardSkeleton";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { CreateTaskForm } from "./forms/CreateTaskForm";
import { Label } from "@radix-ui/react-label";
import { useLocation } from "react-router-dom";

type TasksListProps = {
  tasksList: task[];
  status: string;
  error?: Error | null;
};

const TasksList = ({ tasksList, status }: TasksListProps) => {
  const [parent] = useAutoAnimate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const titleFilter = queryParams.get("q");

  if (status === "pending") {
    return (
      <div className="flex gap-4 flex-wrap  m-4  sm:justify-end justify-center mt-20">
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
    <div
      className="flex gap-4 flex-wrap sm:justify-end m-4 justify-center "
      ref={parent}
    >
      {!titleFilter && (
        <div className="flex flex-col justify-center gap-y-8 items-center  flex-wrap sm:w-[340px]  w-[320px] ">
          <CreateTaskForm />
          <Label>Crea una nueva tarea</Label>
        </div>
      )}
      {Array.isArray(tasksList) &&
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
        ))}
    </div>
  );
};

export default TasksList;
