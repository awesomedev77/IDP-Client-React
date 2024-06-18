import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AuthRoute = () => {
  const { isAuthenticated } = useAuthStore();
  
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoute;