import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PersistLogin from "./utils/PersistLogin";
import { privateRoutes, publicRoutes } from "./models/routes";

import { lazy, Suspense } from "react";
import LoaderMedium from "./components/loaders/LoaderMedium";
import TasksPage from "./pages/TasksPage";

function App() {
  const LazyAsignsPage = lazy(() => import("../src/pages/AsignedPage"));
  const LazyLoginPage = lazy(() => import("../src/pages/LogIn"));
  const LazyRegisterPage = lazy(() => import("../src/pages/Register"));
  const LazyProfilePage = lazy(() => import("../src/pages/Profile"));

  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center">
          <LoaderMedium />
        </div>
      }
    >
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRoute />}>
            <Route path={privateRoutes.TASKS} element={<TasksPage />} />
            <Route
              path={privateRoutes.ASIGNEDTASKS}
              element={<LazyAsignsPage />}
            />
          </Route>
        </Route>

        <Route path={publicRoutes.LOGIN} element={<LazyLoginPage />} />
        <Route path={publicRoutes.REGISTER} element={<LazyRegisterPage />} />
        <Route path={publicRoutes.PROFILE} element={<LazyProfilePage />} />
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </Suspense>
  );
}

export default App;
