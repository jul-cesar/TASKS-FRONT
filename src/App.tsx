import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PersistLogin from "./utils/PersistLogin";
import { privateRoutes, publicRoutes } from "./models/routes";

import TasksPage from "./pages/TasksPage";
import AsignedPage from "./pages/AsignedPage";
import Login from "./pages/LogIn";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<ProtectedRoute />}>
          <Route path={privateRoutes.TASKS} element={<TasksPage />} />
          <Route path={privateRoutes.ASIGNEDTASKS} element={<AsignedPage />} />
        </Route>
      </Route>

      <Route path={publicRoutes.LOGIN} element={<Login />} />
      <Route path={publicRoutes.REGISTER} element={<Register />} />
      <Route path={publicRoutes.PROFILE} element={<Profile />} />
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
}

export default App;
