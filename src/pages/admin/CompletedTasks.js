// src/pages/admin/CompletedTasks.js

import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdminNavbar from '../../components/AdminNavbar';
import './CompletedTasks.css';

export default function CompletedTasks() {
  const [list, setList] = useState([]);
  const [statusMap, setStatusMap] = useState({}); // { attemptId: 'accepted'|'rejected' }

  useEffect(() => {
    api.get('/admin/tasks/completed')
      .then(res => setList(res.data))
      .catch(err => console.error('Error loading completed tasks:', err));
  }, []);

  const handleAccept = (attemptId) => {
    api.post(`/admin/tasks/${attemptId}/accept`)
      .then(res => {
        // disable buttons for this attempt
        setStatusMap(prev => ({ ...prev, [attemptId]: 'accepted' }));
      })
      .catch(err => {
        console.error('Accept error:', err);
        alert('Error accepting task');
      });
  };

  const handleReject = (attemptId) => {
    api.post(`/admin/tasks/${attemptId}/reject`)
      .then(res => {
        // remove from list
        setList(prev => prev.filter(item => item.id !== attemptId));
      })
      .catch(err => {
        console.error('Reject error:', err);
        alert('Error rejecting task');
      });
  };

  return (
    <>
      <AdminNavbar />
      <main className="completed-tasks">
        <h2>Task Approvals</h2>
        {list.length === 0 ? (
          <p>No task attempts to review.</p>
        ) : (
          <ul>
            {list.map(item => {
              const status = statusMap[item.id];
              return (
                <li key={item.id} className="approval-item">
                  <div>
                    <strong>{item.userEmail}</strong> — {item.taskName} (${item.price})
                  </div>
                  <div className="buttons">
                    <button
                      disabled={!!status}
                      onClick={() => handleAccept(item.id)}
                    >
                      {status === 'accepted' ? 'Accepted' : 'Accept'}
                    </button>
                    <button
                      disabled={!!status}
                      onClick={() => handleReject(item.id)}
                    >
                      Reject
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}
