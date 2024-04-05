import AsignedTasksList from "@/components/AsignedTasksList";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import TasksList from "@/components/TasksList";
import { useTasks } from "@/hooks/taskQueries";


import { useState } from "react";

const TasksPage = () => {
  const id = 1;

  
  const {data: tasksList, isLoading} = useTasks()

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
          isLoading={isLoading}
          asignedTasksList={tasksList}
        />
      )}
    </div>
  );
};

export default TasksPage;
