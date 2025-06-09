// src/pages/admin/VerifyWithdrawURLs.js

import React, { useState } from 'react';
import api from '../../api/axios';
import AdminNavbar from '../../components/AdminNavbar';
import './VerifyWithdrawURLs.css';

export default function VerifyWithdrawURLs() {
  const [email, setEmail] = useState('');
  const [urls, setUrls]   = useState(['', '', '', '', '']);
  const [feedback, setFeedback] = useState('');

  const handleSearch = async () => {
    setFeedback('');
    try {
      const res = await api.get(`/admin/withdraw/urls/${email}`);
      setUrls(res.data.urls);
    } catch (err) {
      console.error('Error fetching URLs:', err);
      setFeedback('Error loading URLs');
    }
  };

  const handleSave = async () => {
    setFeedback('');
    try {
      await api.post(`/admin/withdraw/urls/${email}`, { urls });
      setFeedback('URLs saved successfully.');
    } catch (err) {
      console.error('Error saving URLs:', err);
      setFeedback(err.response?.data?.msg || 'Error saving URLs');
    }
  };

  return (
    <>
      <AdminNavbar />
      <main className="verify-withdraw-urls">
        <h2>Verify Withdraw URLs</h2>
        <input
          placeholder="User Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {urls.map((u, i) => (
          <input
            key={i}
            placeholder={`URL #${i + 1}`}
            value={u}
            onChange={e => setUrls(prev => {
              const copy = [...prev];
              copy[i] = e.target.value;
              return copy;
            })}
          />
        ))}

        <button onClick={handleSave}>Save URLs</button>
        {feedback && <p className="feedback">{feedback}</p>}
      </main>
    </>
  );
}
