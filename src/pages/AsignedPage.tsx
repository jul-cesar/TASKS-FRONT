import React from "react";
import AsignedTasksList from "../components/AsignedTasksList";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import TasksPagesLayout from "@/components/layout/TasksPagesLayout";

const AsignedPage = () => {
  return (
    <TasksPagesLayout>
      <AsignedTasksList />
    </TasksPagesLayout>
  );
};

export default AsignedPage;
