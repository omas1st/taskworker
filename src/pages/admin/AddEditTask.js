import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import AdminNavbar from '../../components/AdminNavbar';
import { useParams, useNavigate } from 'react-router-dom';
import './AddEditTask.css';

export default function AddEditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ name: '', description: '', price: '', url: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`/admin/tasks/${id}`)
        .then(res => setTask(res.data))
        .catch(err => setError(err.response?.data?.msg || 'Error loading task'));
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (id) {
        await api.put(`/admin/tasks/${id}`, task);
      } else {
        await api.post('/admin/tasks', task);
      }
      navigate('/admin/tasks');
    } catch (err) {
      console.error('Add/Edit Task error:', err);
      setError(err.response?.data?.msg || 'Error saving task');
    }
  };

  return (
    <>
      <AdminNavbar />
      <main className="add-edit-task">
        <h2>{id ? 'Edit' : 'Add'} Task</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={task.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            name="price"
            type="number"
            value={task.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            name="url"
            value={task.url}
            onChange={handleChange}
            placeholder="External URL"
            required
          />
          <button type="submit">{id ? 'Update' : 'Save'}</button>
        </form>
      </main>
    </>
  );
}
