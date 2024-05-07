import CardSkeleton from "./loaders/CardSkeleton";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CreateTaskForm } from "./forms/CreateTaskForm";
import { useLocation } from "react-router-dom";
import { Label } from "./ui/label";
import { lazy } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useTeamTasks } from "@/hooks/queries/teamsQueries/queries";
import useSearch from "@/hooks/useSearch";

const TaskCard = lazy(() => import("./Card.tasks/TaskCard"));

const TasksList = () => {
  const location = useLocation();
  const idTeam = location.pathname.split("/").pop();
  const { data: taskList, status } = useTeamTasks(idTeam ?? "");

  const queryParams = new URLSearchParams(location.search);
  const titleFilter = queryParams.get("q");
  const debounceValue = useDebounce(titleFilter);

  const filtered = useSearch(taskList, debounceValue);

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
      {!titleFilter && (
        <div className="flex flex-col justify-center gap-y-8 items-center  flex-wrap sm:w-[340px]  w-[320px] ">
          <CreateTaskForm />
          <Label>Crea una nueva tarea</Label>
        </div>
      )}
      {filtered?.map((tarea) => (
        <TaskCard
          tareaInfo={tarea}
          key={tarea.id}
          createdAt={tarea.createdAt}
          title={tarea.title}
          description={tarea.description}
          priority={tarea.priority}
          expiringDate={tarea.expiringDate}
          state={tarea.state}
          owner={tarea.owner}
          asigned={tarea.asigned}
        />
      ))}
    </div>
  );
};

export default TasksList;
