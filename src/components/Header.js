// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img1.png';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="TaskWorker Logo" className="header__logo-img" />
      </div>
      <h1 className="header__title">TaskWorker</h1>
      <nav className="header__nav">
        <Link to="/login" className="header__link">Login</Link>
        <Link to="/register" className="header__link">Register</Link>
      </nav>
    </header>
  );
}
