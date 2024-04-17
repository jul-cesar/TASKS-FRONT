import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { UiContextProvider } from "./context/ui.tsx";
import { AuthProvider } from "./context/auth.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <UiContextProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Toaster richColors />
          <BrowserRouter>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </UiContextProvider>
  </AuthProvider>
);
