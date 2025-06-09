import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import './AdminDashboard.css';

export default function AdminDashboard() {
  return (
    <>
      <AdminNavbar />
      <main className="admin-dashboard">
        <h2>Welcome, Admin</h2>
        <p>Select a menu item above to get started.</p>
      </main>
    </>
  );
}
