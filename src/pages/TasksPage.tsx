import AsignedTasksList from "@/components/AsignedTasksList";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import TasksList from "@/components/TasksList";
import { task } from "@/types/Task";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const TasksPage = () => {
  const id = 1;

  const { data: tasksList, isLoading } = useQuery<task[]>({
    queryKey: ["listaTasks", id],
    // queryFn: async () => getUserTareas(id),
    enabled: !!id,
  });

  const { data: asignedList, isLoading: loadingAsign } = useQuery<task[]>({
    queryKey: ["listaAsign", id],
    // queryFn: async () => getTareasAsignadas(id),
    enabled: !!id,
  });

  const [showTareas, setShowTareas] = useState<boolean>(false);
  return (
    <div className="h-full w-full">
      <Navbar />
      <Tabs setShowTareas={setShowTareas} showTareas={showTareas} />

      <div className="text-center m-4">
        <h2 className="font-bold">Bienvenido, .</h2>
      </div>
      {showTareas ? (
        <TasksList tasksList={tasksList} isLoading={isLoading} />
      ) : (
        <AsignedTasksList
          isLoading={loadingAsign}
          asignedTasksList={asignedList}
        />
      )}
    </div>
  );
};

export default TasksPage;
