import { Auth } from "@/context/auth";
import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useContext(Auth);

  if (Object.values(currentUser).some((x) => x === "")) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
