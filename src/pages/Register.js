import React, { useState } from 'react';
import Select from 'react-select';
import { getNames } from 'country-list';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './Register.css';

const countryOptions = getNames().map(name => ({ label: name, value: name }));

export default function Register() {
  const [form, setForm] = useState({
    profileType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCountry = option => {
    setForm(prev => ({ ...prev, country: option.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Hash on client
    const hashed = bcrypt.hashSync(form.password, 10);

    try {
      // 1) Register
      await api.post('/auth/register', {
        ...form,
        password: hashed,
      });

      // 2) Auto-login
      const res = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
      });

      const { token, role } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // 3) Redirect
      if (role === 'worker') navigate('/worker');
      else navigate('/customer');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <select name="profileType" onChange={handleChange} required>
        <option value="">Profile Type</option>
        <option value="worker">Task Worker</option>
        <option value="customer">Customer</option>
      </select>
      <input name="firstName" onChange={handleChange} placeholder="First name" required />
      <input name="lastName" onChange={handleChange} placeholder="Last name" required />
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="phone" onChange={handleChange} placeholder="Phone number" required />
      <Select options={countryOptions} onChange={handleCountry} placeholder="Country" />
      <select name="gender" onChange={handleChange} required>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <input
        name="confirmPassword"
        type="password"
        onChange={handleChange}
        placeholder="Confirm password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}
