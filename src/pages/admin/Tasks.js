import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdminNavbar from '../../components/AdminNavbar';
import { Link } from 'react-router-dom';
import './Tasks.css';

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/admin/tasks')
      .then(res => setTasks(res.data))
      .catch(err => {
        console.error('Error fetching tasks:', err);
        setError('Error loading tasks');
      });
  }, []);

  const handleDelete = id => {
    if (window.confirm('Delete this task?')) {
      api.delete(`/admin/tasks/${id}`)
        .then(() => setTasks(tasks.filter(t => t._id !== id)))
        .catch(err => {
          console.error('Error deleting task:', err);
          setError('Error deleting task');
        });
    }
  };

  return (
    <>
      <AdminNavbar />
      <main className="admin-tasks-page">
        <h2>Tasks</h2>
        {error && <p className="error">{error}</p>}
        <Link to="/admin/tasks/new"><button>Add New Task</button></Link>
        <ul>
          {tasks.map(t => (
            <li key={t._id}>
              {t.name} (${t.price})
              <Link to={`/admin/tasks/${t._id}/edit`}><button>Edit</button></Link>
              <button onClick={() => handleDelete(t._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
