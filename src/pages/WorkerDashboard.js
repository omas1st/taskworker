// src/pages/WorkerDashboard.js

import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PrivateRoute from '../components/PrivateRoute';
import WorkerNavbar from '../components/WorkerNavbar';
import './WorkerDashboard.css';

export default function WorkerDashboard() {
  const [user, setUser] = useState({});
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [withdrawError, setWithdrawError] = useState('');

  useEffect(() => {
    api.get('/user/me')
      .then(res => {
        setUser(res.data);

        const balanceOK = res.data.walletBalance >= 200;
        const registeredDate = new Date(res.data.createdAt);
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const ageOK = registeredDate <= sevenDaysAgo;

        if (!balanceOK) {
          setWithdrawError('You need at least $200 in your wallet to withdraw.');
        } else if (!ageOK) {
          setWithdrawError('You must be registered for at least 7 days to withdraw.');
        } else {
          setCanWithdraw(true);
        }
      })
      .catch(console.error);
  }, []);

  const handleWithdrawClick = () => {
    if (canWithdraw) {
      window.location = '/worker/withdraw';
    } else {
      alert(withdrawError);
    }
  };

  return (
    <PrivateRoute role="worker">
      <WorkerNavbar />
      <main className="worker-dash">
        <h2>Welcome, {user.firstName}!</h2>

        <section className="wallet">
          <h3>Wallet Balance</h3>
          <p>${user.walletBalance?.toFixed(2)}</p>
          <button onClick={handleWithdrawClick}>
            Withdraw
          </button>
        </section>
      </main>
    </PrivateRoute>
  );
}
