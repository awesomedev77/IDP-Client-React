import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AdminRoute = () => {
  const { user } = useAuthStore();
  return user?.role.toLowerCase() === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
