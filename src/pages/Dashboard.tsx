import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useTonConnectUI } from '@tonconnect/ui-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadScreen from '../components/LoadScreen';
import '../styles/globals.css';

interface DashboardProps {
  toggleAudio: () => void;
  isAudioPlaying: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ toggleAudio, isAudioPlaying }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="dashboard">
      {/* ... other Dashboard content */}
      <button onClick={() => setShowSettings(!showSettings)}>Settings</button>
      {showSettings && (
        <div className="settings-panel">
          <h2>Settings</h2>
          <div className="setting-item">
            <label htmlFor="audio-toggle">Background Music</label>
            <input
              id="audio-toggle"
              type="checkbox"
              checked={isAudioPlaying}
              onChange={toggleAudio}
            />
          </div>
        </div>
      )}
      {/* ... rest of the Dashboard content */}
    </div>
  );
};

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
                  <LoadScreen isPlaying={false} volume={0} loop={false} />
                ) : tonConnectUI.connected ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LoadScreen showConnectButton isPlaying={false} volume={0} loop={false} />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={tonConnectUI.connected ? <Dashboard toggleAudio={() => {}} isAudioPlaying={false} /> : <Navigate to="/" replace />} 
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