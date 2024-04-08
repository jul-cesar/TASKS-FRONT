import { Auth } from "@/context/auth";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { authTok } = useContext(Auth);
  const location = useLocation();
  return authTok.token !== "" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
