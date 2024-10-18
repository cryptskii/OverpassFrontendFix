import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useTonConnectUI } from '@tonconnect/ui-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadScreen from '../components/LoadScreen';
import Dashboard from './Dashboard';
import '../styles/globals.css';


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
    document.title = tonConnectUI.connected ? 'Crypto Dashboard' : 'Crypto Dashboard - Not Connected';
  }, [tonConnectUI.connected]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-screen">
        <Header />
        <main className="dashboard-content">
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
      <div className="dashboard-glow"></div>
    </div>
  );
};

export default App;