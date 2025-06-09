// src/pages/CustomerDashboard.js

import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PrivateRoute from '../components/PrivateRoute';
import './CustomerDashboard.css';

export default function CustomerDashboard() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    api.get('/messages').then(res => setMessages(res.data)).catch(console.error);
  }, []);

  const send = () => {
    if (!text.trim()) return;
    api.post('/messages', { text })
      .then(res => {
        setMessages(prev => [...prev, res.data]);
        setText('');
      })
      .catch(console.error);
  };

  return (
    <PrivateRoute role="customer">
      <main className="customer-dash">
        <h2>Customer Dashboard</h2>

        <section className="message-box">
          <h3>Send Message to Admin</h3>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={send}>Send</button>
        </section>

        <section className="notifications">
          <h3>Your Notifications</h3>
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <ul>
              {messages.map(m => (
                <li key={m._id}>
                  <strong>
                    {m.text.startsWith('withdrawRequested:')
                      ? 'System'
                      : m.fromUser?.email || 'Admin'}
                  </strong>: {m.text}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </PrivateRoute>
  );
}
