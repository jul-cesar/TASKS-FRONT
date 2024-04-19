import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { ReactNode } from "react";

const TasksPagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="h-full w-full flex flex-col sm:w-[82%] sm:float-right  ">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default TasksPagesLayout;
