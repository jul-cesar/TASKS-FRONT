import CardSkeleton from "./loaders/CardSkeleton";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CreateTaskForm } from "./forms/CreateTaskForm";
import { useLocation } from "react-router-dom";
import { Label } from "./ui/label";
import { lazy, Suspense, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useTasks } from "@/hooks/queries/taskQueries/queries";

const TaskCard = lazy(() => import("./Card.tasks/TaskCard"));

const TasksList = () => {
  const { data: taskList, status } = useTasks();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const titleFilter = queryParams.get("q");
  const debounceValue = useDebounce(titleFilter);

  const filtered = useMemo(() => {
    return debounceValue
      ? taskList?.filter((x) =>
          x.titulo
            .toLocaleLowerCase()
            .includes(debounceValue.toLocaleLowerCase())
        )
      : taskList;
  }, [debounceValue, taskList]);

  const [parent] = useAutoAnimate();

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
    <div
      className="flex gap-4  flex-wrap sm:justify-center  justify-center m-4 "
      ref={parent}
    >
      <div className="flex flex-col justify-center gap-y-8 items-center  flex-wrap sm:w-[340px]  w-[320px] ">
        <CreateTaskForm />
        <Label>Crea una nueva tarea</Label>
      </div>

      <Suspense fallback={<span></span>}>
        {filtered?.map((tarea) => (
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
      </Suspense>
    </div>
  );
};

export default TasksList;
