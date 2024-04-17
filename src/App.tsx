import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PersistLogin from "./utils/PersistLogin";
import { privateRoutes, publicRoutes } from "./models/routes";
import { UiContextProvider } from "./context/ui";
import { AuthProvider } from "./context/auth";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
import Login from "./pages/LogIn";
import Register from "./pages/Register";
import { lazy, Suspense } from "react";
import LoaderMedium from "./components/loaders/LoaderMedium";
import TasksPage from "./pages/TasksPage";

function App() {
  const LazyAsignsPage = lazy(() => import("../src/pages/AsignedPage"));
  const LazyProfilePage = lazy(() => import("../src/pages/Profile"));

  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center">
          <LoaderMedium />
        </div>
      }
    >
      <UiContextProvider>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster richColors />

            <Routes>
              <Route element={<PersistLogin />}>
                <Route element={<ProtectedRoute />}>
                  <Route
                    path={privateRoutes.TASKS}
                    element={<TasksPage />}
                  />
                  <Route
                    path={privateRoutes.ASIGNEDTASKS}
                    element={<LazyAsignsPage />}
                  />
                </Route>
              </Route>
              <Route path={publicRoutes.LOGIN} element={<Login />} />
              <Route path={publicRoutes.REGISTER} element={<Register />} />
              <Route
                path={publicRoutes.PROFILE}
                element={<LazyProfilePage />}
              />
              <Route path="*" element={<>Not Found</>} />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </UiContextProvider>
    </Suspense>
  );
}

export default App;
