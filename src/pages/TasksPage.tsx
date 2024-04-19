import TasksPagesLayout from "@/layout/TasksPagesLayout";
import SearchTasks from "@/components/SearchTasks";

import TasksList from "@/components/TasksList";

const TasksPage = () => {
  return (
    <TasksPagesLayout>
      <SearchTasks />
      <TasksList />
    </TasksPagesLayout>
  );
};

export default TasksPage;
