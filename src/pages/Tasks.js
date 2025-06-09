// src/pages/Tasks.js

import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PrivateRoute from '../components/PrivateRoute';
import WorkerNavbar from '../components/WorkerNavbar';
import './Tasks.css';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(console.error);
  }, []);

  const startTask = async (task) => {
    try {
      // Mark as started on the backend
      await api.post(`/tasks/${task._id}/start`);
      // Open the external URL directly in a new tab
      const url = task.url.startsWith('http') ? task.url : `https://${task.url}`;
      window.open(url, '_blank');
      // Update local status
      setTasks(prev =>
        prev.map(t =>
          t._id === task._id ? { ...t, status: 'in-progress' } : t
        )
      );
    } catch (err) {
      console.error('Error starting task:', err);
      alert(err.response?.data?.msg || 'Cannot start task');
    }
  };

  const attemptTask = async (task) => {
    try {
      await api.post(`/tasks/${task._id}/attempt`);
      setTasks(prev =>
        prev.map(t =>
          t._id === task._id ? { ...t, status: 'completed' } : t
        )
      );
    } catch (err) {
      console.error('Error marking attempt:', err);
      alert(err.response?.data?.msg || 'Cannot mark attempted');
    }
  };

  return (
    <PrivateRoute role="worker">
      <WorkerNavbar />
      <main className="tasks-page">
        <h2>Available Tasks</h2>
        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task._id} className={`task-card ${task.status}`}>
              <h4>{task.name}</h4>
              <p>{task.description}</p>
              <p>Price: ${task.price}</p>

              <button
                onClick={() => startTask(task)}
                disabled={task.status !== 'not-started'}
              >
                {task.status === 'not-started' ? 'Start Task' : 'Started'}
              </button>

              <button
                onClick={() => attemptTask(task)}
                disabled={task.status !== 'in-progress'}
              >
                {task.status === 'completed' ? 'Completed' : 'Task Attempted'}
              </button>

              <p>Status: {task.status.replace('-', ' ')}</p>
            </div>
          ))}
        </div>
      </main>
    </PrivateRoute>
  );
}
