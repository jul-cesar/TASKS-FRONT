import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PersistLogin from "./utils/PersistLogin";
import { privateRoutes, publicRoutes } from "./models/routes";
import { lazy, Suspense } from "react";
import { UiContextProvider } from "./context/ui";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/auth";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
import Login from "./pages/LogIn";
import Register from "./pages/Register";

function App() {
  const TasksPageLazy = lazy(() => import("./pages/TasksPage"));
  const AsignedPageLazy = lazy(() => import("./pages/AsignedPage"));

  return (
    <UiContextProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster richColors />
          <Suspense>
            <Routes>
              <Route element={<PersistLogin />}>
                <Route element={<ProtectedRoute />}>
                  <Route
                    path={privateRoutes.TASKS}
                    element={<TasksPageLazy />}
                  />
                  <Route
                    path={privateRoutes.ASIGNEDTASKS}
                    element={<AsignedPageLazy />}
                  />
                </Route>
              </Route>
              <Route path={publicRoutes.LOGIN} element={<Login />} />
              <Route path={publicRoutes.REGISTER} element={<Register />} />
              <Route path={publicRoutes.PROFILE} element={<Profile />} />
              <Route path="*" element={<>Not Found</>} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    </UiContextProvider>
  );
}

export default App;
