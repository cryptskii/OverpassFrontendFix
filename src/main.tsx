import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';
import './styles/PipBoyWalletDashboard.css';
import TonConnectProvider from './components/TonConnectProvider';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TonConnectProvider>
        <App />
      </TonConnectProvider>
    </BrowserRouter>
  </React.StrictMode>
);