import React, { useEffect, useState } from 'react';
import './styles/PipBoyWalletDashboard.css';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import LoadScreen from './components/LoadScreen';
import ErrorBoundary from './components/ErrorBoundary';
import TonConnectProvider from './components/TonConnectProvider';
import AudioPlayer from '../src/components/AudioPlayer';

const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 8800)); // Simulating initialization
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

  if (!isInitialized || isLoading) {
    return <LoadScreen showConnectButton isPlaying={false} volume={0} loop={false} URL={'https://cryptskii.github.io/AWESOME.mp3'} />;
  }

  return (
    <ErrorBoundary>
      <TonConnectProvider>
        <div className="App">
          <div className="pip-boy-container">
            <div className="scanline"></div>
            <div className="pip-boy-screen">
              <Header />
              <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
                <TonConnectButton className="ton-connect-button" />
              </div>
              <main className="pip-boy-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/dashboard"
                    element={
                      tonConnectUI.connected ? <Dashboard /> : <Navigate to="/" replace />
                    }
                  />
                  <Route
                    path="/ton-connect"
                    element={
                      tonConnectUI.connected ? (
                        <Navigate to="/dashboard" replace />
                      ) : <LoadScreen showConnectButton isPlaying={false} volume={0} loop={false} URL={''} />
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </TonConnectProvider>
    </ErrorBoundary>
  );
};

export default App;