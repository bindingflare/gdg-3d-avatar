// src/createMain.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import Create from './create';
import './index.css';

createRoot(document.getElementById('create-root')!).render(
  <React.StrictMode>
    <Create />
  </React.StrictMode>
);