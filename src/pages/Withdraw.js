// src/pages/Withdraw.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import PrivateRoute from '../components/PrivateRoute';
import WorkerNavbar from '../components/WorkerNavbar';
import './Withdraw.css';

export default function Withdraw() {
  const [balance, setBalance] = useState(0);
  const [form, setForm] = useState({
    amount: '',
    crypto: 'BTC',
    address: ''
  });
  const navigate = useNavigate();

  // Load current wallet balance
  useEffect(() => {
    api.get('/user/me')
      .then(res => setBalance(res.data.walletBalance))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/withdraw', form);
      // Redirect to verify step
      navigate('/worker/verify-withdraw');
    } catch (err) {
      console.error('Withdraw request failed:', err);
      alert(err.response?.data?.msg || 'Withdrawal request failed');
    }
  };

  return (
    <PrivateRoute role="worker">
      <WorkerNavbar />
      <main className="withdraw-page">
        <h2>Withdraw</h2>
        <p>Current Balance: ${balance.toFixed(2)}</p>
        <form className="withdraw-form" onSubmit={handleSubmit}>
          <label>
            Amount ($200+):
            <input
              name="amount"
              type="number"
              min="200"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Cryptocurrency:
            <select
              name="crypto"
              value={form.crypto}
              onChange={handleChange}
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="XRP">Ripple (XRP)</option>
            </select>
          </label>

          <label>
            Wallet Address:
            <input
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Confirm Withdraw</button>
        </form>
      </main>
    </PrivateRoute>
  );
}
