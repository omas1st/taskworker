// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

import WorkerDashboard from './pages/WorkerDashboard';
import Tasks from './pages/Tasks';
import TaskDetails from './pages/TaskDetails';
import Withdraw from './pages/Withdraw';
import VerifyWithdraw from './pages/VerifyWithdraw';
import ServiceCharge from './pages/ServiceCharge';
import Success from './pages/Success';
import History from './pages/History';
import Messages from './pages/Messages';

import CustomerDashboard from './pages/CustomerDashboard';

// Admin pages (now correctly under src/pages/admin/)
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from './pages/admin/Users';
import UserProfile from './pages/admin/UserProfile';
import EditUser from './pages/admin/EditUser';
import AdminTasks from './pages/admin/Tasks';
import AddEditTask from './pages/admin/AddEditTask';
import CompletedTasks from './pages/admin/CompletedTasks';
import AdminMessages from './pages/admin/Messages';
import VerifyWithdrawURLs from './pages/admin/VerifyWithdrawURLs';
import PinActivation from './pages/admin/PinActivation';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      {/* Public pages wrapped in site Layout */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route path="/register" element={<Layout><Register/></Layout>} />
      <Route path="/login"    element={<Layout><Login/></Layout>}    />

      {/* Worker routes */}
      <Route path="/worker" element={<PrivateRoute role="worker"><WorkerDashboard/></PrivateRoute>} />
      <Route path="/worker/tasks" element={<PrivateRoute role="worker"><Tasks/></PrivateRoute>} />
      <Route path="/worker/tasks/:id" element={<PrivateRoute role="worker"><TaskDetails/></PrivateRoute>} />
      <Route path="/worker/withdraw" element={<PrivateRoute role="worker"><Withdraw/></PrivateRoute>} />
      <Route path="/worker/verify-withdraw" element={<PrivateRoute role="worker"><VerifyWithdraw/></PrivateRoute>} />
      <Route path="/worker/service-charge" element={<PrivateRoute role="worker"><ServiceCharge/></PrivateRoute>} />
      <Route path="/worker/success" element={<PrivateRoute role="worker"><Success/></PrivateRoute>} />
      <Route path="/worker/history" element={<PrivateRoute role="worker"><History/></PrivateRoute>} />
      <Route path="/worker/messages" element={<PrivateRoute role="worker"><Messages/></PrivateRoute>} />

      {/* Customer routes */}
      <Route path="/customer" element={<PrivateRoute role="customer"><CustomerDashboard/></PrivateRoute>} />
      <Route path="/customer/messages" element={<PrivateRoute role="customer"><CustomerDashboard/></PrivateRoute>} />

      {/* Admin routes */}
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard/></PrivateRoute>} />
      <Route path="/admin/users" element={<PrivateRoute role="admin"><Users/></PrivateRoute>} />
      <Route path="/admin/users/:id" element={<PrivateRoute role="admin"><UserProfile/></PrivateRoute>} />
      <Route path="/admin/users/:id/edit" element={<PrivateRoute role="admin"><EditUser/></PrivateRoute>} />
      <Route path="/admin/tasks" element={<PrivateRoute role="admin"><AdminTasks/></PrivateRoute>} />
      <Route path="/admin/tasks/new" element={<PrivateRoute role="admin"><AddEditTask/></PrivateRoute>} />
      <Route path="/admin/tasks/:id/edit" element={<PrivateRoute role="admin"><AddEditTask/></PrivateRoute>} />
      <Route path="/admin/completed" element={<PrivateRoute role="admin"><CompletedTasks/></PrivateRoute>} />
      <Route path="/admin/messages" element={<PrivateRoute role="admin"><AdminMessages/></PrivateRoute>} />
      <Route path="/admin/verify-withdraw" element={<PrivateRoute role="admin"><VerifyWithdrawURLs/></PrivateRoute>} />
      <Route path="/admin/pin-activation" element={<PrivateRoute role="admin"><PinActivation/></PrivateRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
