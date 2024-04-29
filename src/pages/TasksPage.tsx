import TasksPagesLayout from "@/layout/TasksPagesLayout";
import SearchTasks from "@/components/SearchTasks";
import TasksList from "@/components/TasksList";
import { useLocation } from "react-router-dom";

const TasksPage = () => {
  


  return (
    <TasksPagesLayout>
      <SearchTasks />
      <TasksList  />
    </TasksPagesLayout>
  );
};

export default TasksPage;
