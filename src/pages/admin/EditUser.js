import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdminNavbar from '../../components/AdminNavbar';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/admin/users/${id}`)
      .then(res => setBalance(res.data.walletBalance))
      .catch(err => {
        console.error('Error loading user:', err);
        setError('Error loading user data');
      });
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    api.put(`/admin/users/${id}`, { walletBalance: balance })
      .then(() => navigate(`/admin/users/${id}`))
      .catch(err => {
        console.error('Error updating balance:', err);
        setError('Error saving balance');
      });
  };

  return (
    <>
      <AdminNavbar />
      <main className="edit-user">
        <h2>Edit Wallet Balance</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={balance}
            onChange={e => setBalance(Number(e.target.value))}
            required
          />
          <button type="submit">Save</button>
        </form>
      </main>
    </>
  );
}
