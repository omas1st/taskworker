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
      await api.post(`/tasks/${task._id}/start`);
      const url = task.url.startsWith('http') ? task.url : `https://${task.url}`;
      window.open(url, '_blank');
      // reload tasks so startedAt is set
      const res = await api.get('/tasks');
      setTasks(res.data);
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

  // disable logic: 
  // - if completed, both buttons disabled
  // - if in-progress and startedAt older than 72h: start disabled but attempt stays enabled until click
  const isStartDisabled = (t) => {
    if (t.status === 'completed') return true;
    if (t.status === 'in-progress' && t.startedAt) {
      const startedMs = new Date(t.startedAt).getTime();
      return (Date.now() - startedMs) >= 72 * 3600 * 1000;
    }
    return t.status !== 'not-started';
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
                {task.status === 'not-started' ? 'Start Task'
                  : task.status === 'in-progress' ? 'Started'
                  : 'Start Task'}
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
