import React from 'react';
import PrivateRoute from '../components/PrivateRoute';
import WorkerNavbar from '../components/WorkerNavbar';
import './Success.css';

export default function Success() {
  return (
    <PrivateRoute role="worker">
      <WorkerNavbar />
      <main className="success-page">
        <h2>Withdrawal Successful!</h2>
        <p>Your funds have been disbursed.</p>
        <a href="/worker">Back to Dashboard</a>
      </main>
    </PrivateRoute>
  );
}
