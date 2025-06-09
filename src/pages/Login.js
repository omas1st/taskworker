import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './Login.css';

export default function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setLogin(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', login);
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      if (role === 'worker') navigate('/worker');
      else navigate('/customer');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
