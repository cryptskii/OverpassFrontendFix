// src/App.tsx

import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import LoadingComponent from './components/LoadingComponent'; // Ensure this component exists
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Transaction } from './common/types';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme] = useState<'light' | 'dark'>('light');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Access TonConnect's UI instance
  const [tonConnectUI] = useTonConnectUI();

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
    document.title = tonConnectUI.connected ? 'PipBoy Wallet' : 'PipBoy Wallet - Not Connected';

    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = tonConnectUI.connected ? '/logo.png' : '/logo-not-connected.png';
    }
  }, [tonConnectUI.connected]);

  const handleNavigate = () => {
    if (tonConnectUI.connected) {
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
      <header className="App-header flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="flex items-center">
          <img
            src="/assets/2.png"
            className="App-logo mr-2"
            alt="logo"
            style={{ width: '40px', height: 'auto' }}
          />
          <h1 className="text-2xl font-bold">PipBoy Wallet</h1>
        </div>
        <div className="App-buttons">
          <button
            onClick={handleNavigate}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            {tonConnectUI.connected ? 'Go to Dashboard' : 'Connect Wallet'}
          </button>
        </div>
        <div className="App-status">
          <p>Connected: {tonConnectUI.connected ? 'Yes' : 'No'}</p>
        </div>
      </header>
      <div className="App-content">
        <Outlet />
      </div>
      <LoadingComponent isInitialized={isInitialized} isLoading={isLoading} />
    </div>
  );
};

// OpApp handles redirection logic
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
