import TasksPagesLayout from "@/layout/TasksPagesLayout";
import SearchTasks from "@/components/SearchTasks";
import { lazy, Suspense } from "react";

const TasksList = lazy(() => import("@/components/TasksList"));

const TasksPage = () => {
  return (
    <TasksPagesLayout>
      <SearchTasks />
      <Suspense fallback={<span></span>}>
        <TasksList />
      </Suspense>
    </TasksPagesLayout>
  );
};

export default TasksPage;
