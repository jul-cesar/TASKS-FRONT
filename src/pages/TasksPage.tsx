import TasksPagesLayout from "@/layout/TasksPagesLayout";
import SearchTasks from "@/components/SearchTasks";

import TasksList from "@/components/TasksList";
import { useTasks } from "@/hooks/taskQueries";
import { useLocation } from "react-router-dom";
import { task } from "../models/Task";
import { useEffect, useState } from "react";

const TasksPage = () => {
  const { data, status, error, isLoading } = useTasks();

  const taskList = data?.data;

  const location = useLocation();

  const [filteredTasks, setFilteredTasks] = useState<task[] | undefined>([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const titleFilter = queryParams.get("q");

    const filtered = titleFilter
      ? taskList?.filter((x) => x.titulo.includes(titleFilter))
      : taskList;
    setFilteredTasks(filtered);
  }, [location.search, taskList]);

  return (
    <TasksPagesLayout>
     <SearchTasks/>
      <TasksList
        isLoading={isLoading}
        tasksList={filteredTasks || []}
        status={status}
        error={error}
      />
    </TasksPagesLayout>
  );
};

export default TasksPage;
