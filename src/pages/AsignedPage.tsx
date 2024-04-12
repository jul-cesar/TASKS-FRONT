import SearchTasks from "@/components/SearchTasks";
import AsignedTasksList from "../components/AsignedTasksList";
import TasksPagesLayout from "@/layout/TasksPagesLayout";

const AsignedPage = () => {
  return (
    <TasksPagesLayout>
      <SearchTasks/>
      <AsignedTasksList />
    </TasksPagesLayout>
  );
};

export default AsignedPage;
