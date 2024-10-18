import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';

interface LoadScreenProps {
  showConnectButton?: boolean;
}

const LoadScreen: React.FC<LoadScreenProps> = ({ showConnectButton = false }) => {
  return (
    <div className="load-screen">
      <div className="load-screen-content">
        <div className="scanline"></div>
        <img
          src="/assets/9.png"
          alt="Overpass Logo"
          className="op-name"
        />
        {showConnectButton ? (
          <div className="connect-wallet-container">
            <p>Connect your wallet to enter the Wasteland</p>
            <TonConnectButton />
          </div>
        ) : (
          <div className="loading-container">
            <img src="/assets/loadingOPlogo.GIF" alt="Loading..." className="loading-gif" />
            <p className="loading-text">LOADING...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadScreen;