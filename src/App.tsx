import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PersistLogin from "./utils/PersistLogin";
import { privateRoutes, publicRoutes } from "./models/routes";

import { lazy, Suspense } from "react";
import LoaderMedium from "./components/loaders/LoaderMedium";
import TasksPage from "./pages/TasksPage";

function App() {
  const AsignedPage = lazy(() => import("../src/pages/AsignedPage"));
  const Login = lazy(() => import("../src/pages/LogIn"));
  const Register = lazy(() => import("../src/pages/Register"));
  const Profile = lazy(() => import("../src/pages/Profile"));

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
              element={<AsignedPage />}
            />
          </Route>
        </Route>

        <Route path={publicRoutes.LOGIN} element={<Login />} />
        <Route path={publicRoutes.REGISTER} element={<Register />} />
        <Route path={publicRoutes.PROFILE} element={<Profile />} />
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </Suspense>
  );
}

export default App;
