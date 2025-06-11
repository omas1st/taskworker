// src/pages/Tasks.js

import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PrivateRoute from '../components/PrivateRoute';
import WorkerNavbar from '../components/WorkerNavbar';
import './Tasks.css';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error loading tasks:', err);
    }
  };

  const startTask = async (task) => {
    // Always attempt to mark started, but ignore "Already started" error
    try {
      await api.post(`/tasks/${task._id}/start`);
    } catch (err) {
      if (err.response?.data?.msg !== 'Already started') {
        console.error('Error starting task:', err);
        alert(err.response?.data?.msg || 'Cannot start task');
        return;
      }
    }
    // Open the external URL regardless
    const url = task.url.startsWith('http') ? task.url : `https://${task.url}`;
    window.open(url, '_blank');
    // Reload tasks to pick up new timestamps/status
    loadTasks();
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

  const isStartDisabled = (t) => {
    if (t.status === 'completed') return true;
    if (t.startedAt) {
      const startedMs = new Date(t.startedAt).getTime();
      if ((Date.now() - startedMs) >= 72 * 3600 * 1000) {
        return true;
      }
    }
    // not-started or in-progress within 72h
    return false;
  };

  const isAttemptDisabled = (t) => {
    return t.status !== 'in-progress';
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
                disabled={isStartDisabled(task)}
              >
                {task.status === 'not-started' ? 'Start Task' : 'Started'}
              </button>

              <button
                onClick={() => attemptTask(task)}
                disabled={isAttemptDisabled(task)}
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
