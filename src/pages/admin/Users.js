// src/pages/admin/Users.js

import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdminNavbar from '../../components/AdminNavbar';
import './Users.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/admin/users')
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error('Error loading users:', err);
        setError('Failed to load users');
      });
  }, []);

  return (
    <>
      <AdminNavbar />
      <main className="admin-users-page">
        <h2>Registered Users</h2>
        {error && <p className="error">{error}</p>}
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Registered</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Gender</th>
                <th>Wallet ($)</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{new Date(u.createdAt).toLocaleString()}</td>
                  <td>{u.profileType}</td>
                  <td>{u.firstName} {u.lastName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.country}</td>
                  <td>{u.gender}</td>
                  <td>{u.walletBalance?.toFixed(2)}</td>
                  <td>
                    {u.lastLogin
                      ? new Date(u.lastLogin).toLocaleString()
                      : 'Never'}
                  </td>
                  <td>
                    <button onClick={() => window.location = `/admin/users/${u._id}`}>
                      Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
