import React, { useState } from 'react';
import api from '../../api/axios';
import AdminNavbar from '../../components/AdminNavbar';
import './Messages.css';

export default function AdminMessages() {
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    try {
      const res = await api.get(`/admin/messages/${email}`);
      setMsgs(res.data);
    } catch (err) {
      console.error('Search Messages error:', err);
      setError(err.response?.data?.msg || 'Error fetching messages');
    }
  };

  const handleSend = async () => {
    setError('');
    try {
      const res = await api.post('/admin/messages', { email, text });
      setMsgs(prev => [...prev, res.data]);
      setText('');
    } catch (err) {
      console.error('Send Message error:', err);
      setError(err.response?.data?.msg || 'Error sending message');
    }
  };

  return (
    <>
      <AdminNavbar />
      <main className="admin-messages">
        <h2>Messages</h2>
        {error && <p className="error">{error}</p>}
        <input
          placeholder="User Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <textarea
          placeholder="Message"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
        <h3>Conversation</h3>
        <ul>
          {msgs.map(m => (
            <li key={m._id}>{m.text}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
