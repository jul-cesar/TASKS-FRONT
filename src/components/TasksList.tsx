import { task } from "@/types/Task";
import TaskCard from "./TaskCard";
import CardSkeleton from "./loaders/CardSkeleton";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Skeleton } from "./ui/skeleton";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { CreateTaskForm } from "./forms/CreateTaskForm";

type TasksListProps = {
  tasksList: task[];
  status: string;
  error?: Error | null;
};

const TasksList = ({ tasksList, status }: TasksListProps) => {
  const [parent, enableAnimations] = useAutoAnimate();

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
    <div className="flex justify-center m-4 gap-4 flex-wrap" ref={parent}>
      <div className="flex justify-center items-center  flex-wrap sm:w-[350px]  w-[320px] border-border">
      <CreateTaskForm />

      </div>
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
