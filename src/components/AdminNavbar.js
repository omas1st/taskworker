import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

export default function AdminNavbar() {
  const nav = useNavigate();
  const logout = () => {
    localStorage.clear();
    nav('/admin/login');
  };
  return (
    <nav className="admin-nav">
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/tasks">Tasks</Link>
      <Link to="/admin/completed">Completed</Link>
      <Link to="/admin/messages">Messages</Link>
      <Link to="/admin/verify-withdraw">Verify Withdraw</Link>
      <Link to="/admin/pin-activation">Pin Activation</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
