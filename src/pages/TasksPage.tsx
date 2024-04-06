import AsignedTasksList from "@/components/AsignedTasksList";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import TasksList from "@/components/TasksList";
import { Auth } from "@/context/auth";
import { useTasks } from "@/hooks/taskQueries";
import { jwtDecode } from "jwt-decode";

import { useContext, useState } from "react";

const TasksPage = () => {
  const id = 1;

  const { currentUser } = useContext(Auth);
  const { data, isLoading } = useTasks();

  const taskList = data?.data;

  const [showTareas, setShowTareas] = useState<boolean>(true);
  return (
    <div className="h-full w-full">
      <Navbar />
      <Tabs setShowTareas={setShowTareas} showTareas={showTareas} />

      <div className="text-center m-4">
       {currentUser.nombre && <h2 className="font-bold">Bienvenido, {currentUser.id}.</h2>}
      </div>
      {showTareas ? (
        <TasksList tasksList={taskList || []} isLoading={isLoading} />
      ) : (
        <AsignedTasksList isLoading={isLoading} asignedTasksList={taskList} />
      )}
    </div>
  );
};

export default TasksPage;
