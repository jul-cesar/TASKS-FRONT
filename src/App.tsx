import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PersistLogin from "./utils/PersistLogin";
import { privateRoutes, publicRoutes } from "./models/routes";

import { lazy, Suspense } from "react";
import LoaderMedium from "./components/loaders/LoaderMedium";

const Login = lazy(() => import("./pages/LogIn"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const AsignedPage = lazy(() => import("./pages/AsignedPage"));
const TasksPage = lazy(() => import("./pages/TasksPage"));
const SelectTeam = lazy(() => import("./pages/TeamSelectPage"));
const TeamConfig = lazy(() => import("./pages/TeamConfig"));
const Error404 = lazy(() => import("./pages/404"));
function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          {" "}
          <LoaderMedium />{" "}
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
            <Route path={"/"} element={<SelectTeam />} />

            <Route path={privateRoutes.PROFILE} element={<Profile />} />
            <Route path={privateRoutes.TEAMCONF} element={<TeamConfig />} />
          </Route>
        </Route>

        <Route path={publicRoutes.LOGIN} element={<Login />} />
        <Route path={publicRoutes.REGISTER} element={<Register />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}

export default App;
