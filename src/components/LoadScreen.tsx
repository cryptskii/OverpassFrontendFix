import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';

interface LoadScreenProps {
  showConnectButton?: boolean;
}

const LoadScreen: React.FC<LoadScreenProps> = ({ showConnectButton = false }) => {
  return (
    <div className="load-screen">
      <div className="load-screen-content">
        <img src="/assets/pip-boy-logo.png" alt="PipBoy Wallet" className="pip-boy-logo" />
        <h1 className="glow-text">PipBoy Wallet</h1>
        {showConnectButton ? (
          <div className="connect-wallet-container">
            <p>Connect your wallet to enter the Wasteland</p>
            <TonConnectButton />
          </div>
        ) : (
          <div className="loading-container">
            <img src="/assets/loadingOPlogo.gif" alt="Loading..." className="loading-gif" />
            <p className="loading-text">Initializing V.A.T.S...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadScreen;