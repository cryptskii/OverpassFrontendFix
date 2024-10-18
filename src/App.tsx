// src/App.tsx

import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { TonConnectUIProvider, TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { TonAccessProvider } from './components/TonAccessProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

const LoadingComponent: React.FC<{ isInitialized: boolean; isLoading: boolean }> = ({ isInitialized, isLoading }) => {
  if (!isInitialized || isLoading) {
    return (
      <div className="loading-container">
        <img src="/assets/loadingOPlogo.gif" alt="Loading..." />
      </div>
    );
  }
  return null;
};

interface Transaction {
  id: string;
  amount: number;
  date: string;
  sender: string;
  recipient: string;
  status: 'pending' | 'completed' | 'failed';
  type: 'incoming' | 'outgoing';
  description?: string;
}

interface DashboardProps {
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
}

const App: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [connected, setConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme] = useState<'light' | 'dark'>('light');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulating an asynchronous initialization process
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsInitialized(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    document.title = connected ? 'PipBoy Wallet' : 'PipBoy Wallet - Not Connected';

    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = connected ? '/logo.png' : '/logo-not-connected.png';
    }
  }, [connected]);

  const handleConnect = async () => {
    try {
      const walletInfo = await tonConnectUI.connectWallet();
      console.log('Connected wallet:', walletInfo);
      setConnected(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleNavigate = () => {
    if (connected) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const fetchTransactions = async () => {
    try {
      // Fetch transactions from the backend API
      const response = await fetch('/api/transactions');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Transaction[] = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  return (
    <div className={`App ${theme}`}>
      <TonConnectUIProvider manifestUrl="https://ovp-eight.vercel.app/tonconnect-manifest.json">
        <TonAccessProvider>
          <div className="pip-boy-container">
            <div className="pip-boy-screen scanlines">
              <Header />
              <main className="pip-boy-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/dashboard"
                    element={<Dashboard transactions={transactions} fetchTransactions={fetchTransactions} />}
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
          <header className="App-header">
            <img
              src="/assets/2.png"
              className="App-logo"
              alt="logo"
              style={{ width: '40px', height: 'auto' }}
            />
            <h1>PipBoy Wallet</h1>
            <TonConnectButton />
            <div className="App-buttons">
              {!connected ? (
                <button onClick={handleConnect}>Connect</button>
              ) : (
                <button onClick={handleNavigate}>Go to Dashboard</button>
              )}
            </div>
            <div className="App-status">
              <p>Connected: {connected ? 'Yes' : 'No'}</p>
            </div>
          </header>
          <div className="App-content">
            <Outlet />
          </div>
          <LoadingComponent isInitialized={isInitialized} isLoading={isLoading} />
        </TonAccessProvider>
      </TonConnectUIProvider>
    </div>
  );
};

const OpApp: React.FC = () => {
  useEffect(() => {
    // Redirect if accessing the GitHub repository URL
    if (window.location.href === 'https://github.com/cryptskii/OverpassFrontendFix/') {
      window.location.href =
        'https://overpass-channels-czhd-git-crypskii-brandons-projects-d6012021.vercel.app/';
    }
  }, []);

  return <App />;
};

export default OpApp;
