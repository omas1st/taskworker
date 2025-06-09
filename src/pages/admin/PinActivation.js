import React, { useState } from 'react';
import api from '../../api/axios';
import AdminNavbar from '../../components/AdminNavbar';
import './PinActivation.css';

export default function PinActivation() {
  const [email, setEmail] = useState('');
  const [pin4, setPin4]   = useState('');
  const [pin5, setPin5]   = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);

  const activatePin4 = async () => {
    if (!email.trim() || pin4.length !== 4) {
      setFeedback('Enter a valid email and 4-digit PIN.');
      return;
    }
    setLoading4(true);
    setFeedback('');
    try {
      const res = await api.post('/admin/withdraw/pins', { email, pin4 });
      setFeedback(res.data.msg);
    } catch (err) {
      console.error('Error activating pin4:', err);
      setFeedback(err.response?.data?.msg || 'Failed to activate PIN');
    } finally {
      setLoading4(false);
    }
  };

  const activatePin5 = async () => {
    if (!email.trim() || pin5.length !== 5) {
      setFeedback('Enter a valid email and 5-digit PIN.');
      return;
    }
    setLoading5(true);
    setFeedback('');
    try {
      const res = await api.post('/admin/withdraw/pins', { email, pin5 });
      setFeedback(res.data.msg);
    } catch (err) {
      console.error('Error activating pin5:', err);
      setFeedback(err.response?.data?.msg || 'Failed to activate PIN');
    } finally {
      setLoading5(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <main className="pin-activation">
        <h2>Activate Withdrawal PINs</h2>
        <input
          className="pin-email"
          placeholder="User Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <section className="pin-section">
          <h3>Set 4-digit Verify PIN</h3>
          <input
            placeholder="4-digit PIN"
            maxLength="4"
            value={pin4}
            onChange={e => setPin4(e.target.value)}
          />
          <button onClick={activatePin4} disabled={loading4}>
            {loading4 ? 'Activating…' : 'Activate Verify PIN'}
          </button>
        </section>

        <section className="pin-section">
          <h3>Set 5-digit Service PIN</h3>
          <input
            placeholder="5-digit PIN"
            maxLength="5"
            value={pin5}
            onChange={e => setPin5(e.target.value)}
          />
          <button onClick={activatePin5} disabled={loading5}>
            {loading5 ? 'Activating…' : 'Activate Service PIN'}
          </button>
        </section>

        {feedback && <p className="feedback">{feedback}</p>}
      </main>
    </>
  );
}
