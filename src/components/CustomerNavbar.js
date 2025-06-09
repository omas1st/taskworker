import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CustomerNavbar.css';

export default function CustomerNavbar() {
  const nav = useNavigate();
  const logout = () => {
    localStorage.clear();
    nav('/login');
  };
  return (
    <nav className="customer-nav">
      <Link to="/customer/messages">Messages</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
