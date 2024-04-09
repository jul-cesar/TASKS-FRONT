import AsignedTasksList from "@/pages/AsignedTasksList";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import TasksList from "@/components/TasksList";
import { Auth } from "@/context/auth";
import { useAsignedTask, useTasks } from "@/hooks/taskQueries";

import { useContext, useState } from "react";

const TasksPage = () => {
  const { data, status, error } = useTasks();
  const { data: Asigns, status: statusAsign } = useAsignedTask();

  const taskList = data?.data;
  const AsignsList = Asigns?.data;

  const [showTareas, setShowTareas] = useState<boolean>(true);
  return (
    <div className="h-full w-full">
      <Navbar />
      <Tabs setShowTareas={setShowTareas} showTareas={showTareas} />

      <div className="text-center m-2"></div>
      {showTareas ? (
        <TasksList tasksList={taskList || []} status={status} error={error} />
      ) : (
        <AsignedTasksList status={statusAsign} asignedTasksList={AsignsList} />
      )}
    </div>
  );
};

export default TasksPage;
