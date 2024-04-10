import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/LogIn";
import TasksPage from "./pages/TasksPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AsignedPage from "./pages/AsignedPage";
import PersistLogin from "./utils/PersistLogin";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TasksPage />} />
          <Route path="/asigned-tasks" element={<AsignedPage />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
