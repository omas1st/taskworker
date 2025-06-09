// src/pages/Messages.js

import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PrivateRoute from '../components/PrivateRoute';
import WorkerNavbar from '../components/WorkerNavbar';
import './Messages.css';

export default function Messages() {
  const [msgs, setMsgs] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load notifications
    api.get('/messages')
      .then(r => setMsgs(r.data))
      .catch(err => {
        console.error('Error loading messages:', err);
        alert('Could not load notifications');
      });
    // Load tasks for mapping IDs to details
    api.get('/tasks')
      .then(r => setTasks(r.data))
      .catch(err => console.error('Error loading tasks:', err));
  }, []);

  const send = async () => {
    if (!text.trim()) {
      alert('Cannot send empty message');
      return;
    }
    setLoading(true);
    try {
      await api.post('/messages', { text });
      setText('');
      alert('Message sent successfully');
    } catch (err) {
      console.error('Error sending message:', err);
      alert(err.response?.data?.msg || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = (m) => {
    const t = m.text;
    if (t.startsWith('started:')) {
      const id = t.split(':')[1];
      const task = tasks.find(x => x._id === id);
      return task
        ? `You started "${task.name}" ($${task.price.toFixed(2)})`
        : 'You started a task';
    }
    if (t.startsWith('attempted:')) {
      const id = t.split(':')[1];
      const task = tasks.find(x => x._id === id);
      return task
        ? `You completed attempt for "${task.name}" ($${task.price.toFixed(2)})`
        : 'You attempted a task';
    }
    if (t.startsWith('taskAccepted:')) {
      const [, name, price] = t.split(':');
      return `Your task "${name}" was accepted. $${price} added to your wallet.`;
    }
    if (t.startsWith('taskRejected:')) {
      const [, name] = t.split(':');
      return `Your task "${name}" was rejected.`;
    }
    if (t.startsWith('pinsActivated:')) {
      // e.g. "pinsActivated:verifyPin:1234,servicePin:54321"
      const parts = t.replace('pinsActivated:', '').split(',');
      return parts.map((p, i) => {
        const [key, val] = p.split(':');
        const label = key === 'verifyPin'
          ? '4-digit Verify PIN'
          : key === 'servicePin'
            ? '5-digit Service PIN'
            : key;
        return (
          <div key={i}>
            {label}: <code>{val}</code>
          </div>
        );
      });
    }
    // fallback
    return t;
  };

  return (
    <PrivateRoute role="worker">
      <WorkerNavbar />
      <main className="messages-page">

        {/* Section 1: Send Message */}
        <section className="send-section">
          <h2>Send Message to Admin</h2>
          <textarea
            className="send-textarea"
            placeholder="Type your message..."
            value={text}
            onChange={e => setText(e.target.value)}
            rows={4}
          />
          <button
            className="send-button"
            onClick={send}
            disabled={loading}
          >
            {loading ? 'Sending…' : 'Send'}
          </button>
        </section>

        {/* Section 2: Notifications */}
        <section className="notifications-section">
          <h2>Notifications</h2>
          {msgs.length === 0 ? (
            <p>No notifications yet.</p>
          ) : (
            <ul className="notifications-list">
              {msgs.map(m => (
                <li key={m._id} className="notification-item">
                  <strong>{m.fromUser?.email || 'System'}:</strong>{' '}
                  <span className="notification-content">
                    {renderMessage(m)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </PrivateRoute>
  );
}
