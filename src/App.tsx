import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PersistLogin from "./utils/PersistLogin";
import { privateRoutes, publicRoutes } from "./models/routes";

import { lazy, Suspense, useContext } from "react";
import LoaderMedium from "./components/loaders/LoaderMedium";
import { SelectTeam } from "./pages/TeamSelectPage";
import { Auth } from "./context/auth";

const Login = lazy(() => import("./pages/LogIn"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const AsignedPage = lazy(() => import("./pages/AsignedPage"));
const TasksPage = lazy(() => import("./pages/TasksPage"));

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
            <Route path={`/:user/:teamid`} element={<TasksPage />} />
            <Route
              path={privateRoutes.ASIGNEDTASKS}
              element={<AsignedPage />}
            />
            <Route path={"/select"} element={<SelectTeam />} />

            <Route path={publicRoutes.PROFILE} element={<Profile />} />
          </Route>
        </Route>

        <Route path={publicRoutes.LOGIN} element={<Login />} />
        <Route path={publicRoutes.REGISTER} element={<Register />} />
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </Suspense>
  );
}

export default App;
