import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PersistLogin from "./utils/PersistLogin";
import { privateRoutes, publicRoutes } from "./models/routes";
import { lazy, Suspense } from "react";

function App() {
  const LogInLazy = lazy(() => import("./pages/LogIn"));
  const RegisterLazy = lazy(() => import("./pages/Register"));
  const TasksPageLazy = lazy(() => import("./pages/TasksPage"));
  const AsignedPageLazy = lazy(() => import("./pages/AsignedPage"));

  return (
    <Suspense>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRoute />}>
            <Route path={privateRoutes.TASKS} element={<TasksPageLazy />} />
            <Route
              path={privateRoutes.ASIGNEDTASKS}
              element={<AsignedPageLazy />}
            />
          </Route>
        </Route>
        <Route path={publicRoutes.LOGIN} element={<LogInLazy />} />
        <Route path={publicRoutes.REGISTER} element={<RegisterLazy />} />
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </Suspense>
  );
}

export default App;
