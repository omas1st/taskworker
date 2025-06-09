import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';          // <-- add this

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>         {/* optional but helpful */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
