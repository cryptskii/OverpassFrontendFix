import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useTonConnectUI } from '@tonconnect/ui-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import LoadScreen from './components/LoadScreen';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 8000)); // Simulating initialization
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

  if (!isInitialized || isLoading) {
    return <LoadScreen />;
  }

  return (
    <div className="App">
      <div className="pip-boy-container">
        <div className="scanline"></div>
        <div className="pip-boy-screen">
          <Header />
          <main className="pip-boy-content">
            <Routes>
              <Route path="/" element={
                tonConnectUI.connected ? <Navigate to="/dashboard" replace /> : <Home />
              } />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={
                tonConnectUI.connected ? <Dashboard /> : <Navigate to="/" replace />
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;