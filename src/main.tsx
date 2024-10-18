// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';
import './styles/PipBoyWalletDashboard.css';
import OpApp from './App'; // Imports the default export from App.tsx

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <OpApp />
    </BrowserRouter>
  </React.StrictMode>
);
