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
  const { data, status, error, isError } = useTasks();

  const taskList = data?.data;

  const [showTareas, setShowTareas] = useState<boolean>(true);
  return (
    <div className="h-full w-full">
      <Navbar />
      <Tabs setShowTareas={setShowTareas} showTareas={showTareas} />

      <div className="text-center m-4">
        {currentUser.nombre && (
          <h2 className="font-bold">Bienvenido, {currentUser.nombre}.</h2>
        )}
      </div>
      {showTareas ? (
        <TasksList tasksList={taskList || []} status={status} error={error} />
      ) : (
        <AsignedTasksList status={status} asignedTasksList={taskList} />
      )}
    </div>
  );
};

export default TasksPage;
