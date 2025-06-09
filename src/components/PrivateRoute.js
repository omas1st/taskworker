import React from 'react';
import { Navigate } from 'react-router-dom';
import './PrivateRoute.css';

export default function PrivateRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  if (!token || (role && userRole !== role)) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
