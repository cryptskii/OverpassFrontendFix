import React, { useEffect, useState } from 'react';
import { } from 'vite'
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { TonConnectUIProvider, TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { TonAccessProvider } from './components/TonAccessProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

// Import these modules once they are available
// import logoImage from './assets/images/OP_logo_Pip2.png';
// import './styles/App.css';
// import { useTonConnect } from './hooks/useTonConnect';
// import { useTheme } from './hooks/useTheme';
// import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  // Commented out due to missing imports
  // const { walletInfo, isLoading, error } = useTonConnect();
  const [tonConnectUI] = useTonConnectUI();
  const navigate = useNavigate();
  // const { theme, toggleTheme } = useTheme();
  const [isInitialized, setIsInitialized] = useState(false);

  // Placeholder values
  const connected = false;
  const isLoading = false;
  const error: null = null;
  const theme: 'light' | 'dark' = 'light';

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulating an asynchronous initialization process
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        // Handle initialization error
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    document.title = connected ? 'PipBoy Wallet' : 'PipBoy Wallet - Not Connected';

    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = connected ? '/logo.png' : '/logo-not-connected.png'
    }

 
  }, [connected]);

  const handleConnect = async () => {
    try {
      const walletInfo = await tonConnectUI.connectWallet();
      console.log('Connected wallet:', walletInfo);
      // Perform any necessary actions after successful connection
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      // Handle connection error
    }
  };

  const handleNavigate = () => {
    if (connected) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  if (!isInitialized || isLoading) {
    return <div>Loading...</div>; // Replace with LoadingSpinner once available
  }

  if (error) {
    return <div>Error: {String(error)}</div>;
  }

  return (
    <div className={`App ${theme}`}>
      <TonConnectUIProvider manifestUrl="https://overpass-channels-czhd-git-crypskii-brandons-projects-d6012021.vercel.app/tonconnect-manifest.json">
        <TonAccessProvider>
          <div className="pip-boy-container">
            <div className="pip-boy-screen scanlines">
              <Header />
              <main className="pip-boy-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
          <header className="App-header">
            {/* <img src={logoImage} className="App-logo" alt="logo" style={{ width: '40px', height: 'auto' }} /> */}
            <h1>PipBoy Wallet</h1>
            <TonConnectButton />
            <div className="App-buttons">
              {!connected ? (
                <button onClick={handleConnect}>Connect</button>
              ) : (
                <button onClick={handleNavigate}>Go to Dashboard</button>
              )}
              {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
            </div>
            <div className="App-status">
              <p>Connected: {connected ? 'Yes' : 'No'}</p>
            </div>
          </header>
          <div className="App-content">
            <Outlet />
          </div>
        </TonAccessProvider>
      </TonConnectUIProvider>
    </div>
  );
};
export default App;