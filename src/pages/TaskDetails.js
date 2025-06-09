import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import PrivateRoute from '../components/PrivateRoute';
import WorkerNavbar from '../components/WorkerNavbar';
import './TaskDetails.css';

export default function TaskDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [task, setTask] = useState({});
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    api.get(`/tasks/${id}`)
      .then(res => {
        setTask(res.data.task);
        setAttempted(res.data.attempted);
      })
      .catch(console.error);
  }, [id]);

  const start = () => window.open(task.url, '_blank');
  const markAttempt = () => {
    api.post(`/tasks/${id}/attempt`)
      .then(() => setAttempted(true))
      .catch(console.error);
  };

  return (
    <PrivateRoute role="worker">
      <WorkerNavbar />
      <main className="task-details">
        <h2>{task.name}</h2>
        <p>{task.description}</p>
        <p>Price: ${task.price}</p>
        <div className="buttons">
          <button onClick={start} disabled={attempted}>Start</button>
          <button onClick={markAttempt} disabled={attempted}>Task Attempted</button>
        </div>
        {attempted && <p className="status">Status: In Progress</p>}
        <button onClick={() => nav('/worker/tasks')}>← Back to Tasks</button>
      </main>
    </PrivateRoute>
  );
}
