import AsignedTasksList from "@/pages/AsignedTasksList";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import TasksList from "@/components/TasksList";
import { Auth } from "@/context/auth";
import { useTasks } from "@/hooks/taskQueries";

import { useContext, useState } from "react";

const TasksPage = () => {
  const { currentUser } = useContext(Auth);
  const { data, status, error } = useTasks();

  const taskList = data?.data;

  const [showTareas, setShowTareas] = useState<boolean>(true);
  return (
    <div className="h-full w-full">
      <Navbar />
      <Tabs setShowTareas={setShowTareas} showTareas={showTareas} />

      <div className="text-center m-3">
        
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
