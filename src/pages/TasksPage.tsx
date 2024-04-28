import TasksPagesLayout from "@/layout/TasksPagesLayout";
import SearchTasks from "@/components/SearchTasks";
import TasksList from "@/components/TasksList";
import { useLocation } from "react-router-dom";

const TasksPage = () => {
  const location = useLocation();
  const idTeam = location.pathname.split("/").pop();

  return (
    <TasksPagesLayout>
      <SearchTasks />
      <TasksList idTeam={idTeam ?? ""} />
    </TasksPagesLayout>
  );
};

export default TasksPage;
