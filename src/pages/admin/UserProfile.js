import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdminNavbar from '../../components/AdminNavbar';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './UserProfile.css';

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    api.get(`/admin/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => {
        console.error('Error fetching user:', err);
        alert('Error loading user');
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Delete this user?')) {
      api.delete(`/admin/users/${id}`)
        .then(() => navigate('/admin/users'))
        .catch(err => {
          console.error('Error deleting user:', err);
          alert('Error deleting user');
        });
    }
  };

  return (
    <>
      <AdminNavbar />
      <main className="user-profile">
        <h2>{user.firstName} {user.lastName}</h2>
        <p>Email: {user.email}</p>
        <p>Wallet Balance: ${user.walletBalance?.toFixed(2)}</p>
        <Link to={`/admin/users/${id}/edit`}><button>Edit Balance</button></Link>
        <button onClick={handleDelete}>Delete User</button>
      </main>
    </>
  );
}
