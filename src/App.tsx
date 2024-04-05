import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/auth";
import Login from "./pages/LogIn";
import TasksPage from "./pages/TasksPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
