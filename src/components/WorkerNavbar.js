import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './WorkerNavbar.css';

export default function WorkerNavbar() {
  const nav = useNavigate();
  const logout = () => {
    localStorage.clear();
    nav('/login');
  };
  return (
    <nav className="worker-nav">
      <Link to="/worker">Dashboard</Link>
      <Link to="/worker/tasks">Tasks</Link>
      <Link to="/worker/history">History</Link>
      <Link to="/worker/messages">Messages</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
