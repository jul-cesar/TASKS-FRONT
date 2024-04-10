import React, { ReactNode } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import SearchTasks from "../SearchTasks";

const TasksPagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col p-2">
      <Navbar />

      <Sidebar />
      
      {children}
    </div>
  );
};

export default TasksPagesLayout;
