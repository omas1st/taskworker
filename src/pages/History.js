import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PrivateRoute from '../components/PrivateRoute';
import WorkerNavbar from '../components/WorkerNavbar';
import './History.css';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get('/tasks/history')
      .then(res => setHistory(res.data))
      .catch(console.error);
  }, []);

  return (
    <PrivateRoute role="worker">
      <WorkerNavbar />
      <main className="history-page">
        <h2>Your Task History</h2>
        {history.length === 0 ? (
          <p>No tasks attempted yet.</p>
        ) : (
          <ul>
            {history.map(h => (
              <li key={h.id}>
                {h.taskName} — ${h.price} — {new Date(h.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </main>
    </PrivateRoute>
  );
}
