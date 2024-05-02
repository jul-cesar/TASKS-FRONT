import { lazy, ReactNode, Suspense } from "react";

const TasksPagesLayout = ({ children }: { children: ReactNode }) => {
  const Navbar = lazy(() => import("@/components/Navbar/Navbar"));
  const Sidebar = lazy(() => import("@/components/Sidebar/Sidebar"));

  return (
    <Suspense fallback={<span></span>}>
      <div>
        <Navbar />
        <div className="h-full w-full flex flex-col sm:w-[82%] sm:float-right  ">
          <Sidebar />
          {children}
        </div>
      </div>
    </Suspense>
  );
};

export default TasksPagesLayout;
