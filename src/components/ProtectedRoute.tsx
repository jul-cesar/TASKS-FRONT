import { Auth } from "@/context/auth";
import { publicRoutes } from "@/models/routes";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const   ProtectedRoute = () => {
  const { authTok } = useContext(Auth);
  const location = useLocation();
  return authTok.token !== "" ? (
    <Outlet />
  ) : (
    <Navigate to={publicRoutes.LOGIN} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
