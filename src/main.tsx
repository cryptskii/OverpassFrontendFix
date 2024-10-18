// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';
import './styles/PipBoyWalletDashboard.css';
import TonConnectProvider from './components/TonConnectProvider'; // Adjust the path as needed
import OpApp from './App'; // Ensure OpApp is correctly exported from App.tsx

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TonConnectProvider>
        <OpApp />
      </TonConnectProvider>
    </BrowserRouter>
  </React.StrictMode>
);
