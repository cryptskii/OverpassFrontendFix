import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useTonConnectUI } from '@tonconnect/ui-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadScreen from '../components/LoadScreen';
import Dashboard from './Dashboard';
import '../styles/PipBoyWalletDashboard.css';

const App: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // Simulate initialization process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  useEffect(() => {
    document.title = tonConnectUI.connected ? 'PipBoy Wallet' : 'PipBoy Wallet - Not Connected';
  }, [tonConnectUI.connected]);

  return (
    <Router>
      <div className="pip-boy-container">
        <div className="scanline"></div>
        <div className="pip-boy-screen">
          <Header />
          <main className="pip-boy-content">
            <Routes>
              <Route 
                path="/" 
                element={
                  isLoading ? (
                    <LoadScreen />
                  ) : tonConnectUI.connected ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LoadScreen showConnectButton />
                  )
                } 
              />
              <Route 
                path="/dashboard" 
                element={tonConnectUI.connected ? <Dashboard /> : <Navigate to="/" replace />} 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;