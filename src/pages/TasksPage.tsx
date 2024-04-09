import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Tabs from "@/components/Tabs";
import TasksList from "@/components/TasksList";
import { useTasks } from "@/hooks/taskQueries";

const TasksPage = () => {
  const { data, status, error } = useTasks();

  const taskList = data?.data;

  return (
    <div className="h-full w-full  p-2">
      <Navbar />

      <Sidebar />
      <TasksList tasksList={taskList || []} status={status} error={error} />
    </div>
  );
};

export default TasksPage;
