import { TonConnectButton } from '@tonconnect/ui-react';
import React, { useEffect } from 'react';

interface LoadScreenProps {
  showConnectButton?: boolean;
  isPlaying?: boolean;
  volume?: number;
  loop?: boolean;
  URL?: string;
}

const LoadScreen: React.FC<LoadScreenProps> = ({ showConnectButton = false, isPlaying = false, volume = 1, loop = false, URL = '' }) => {
  useEffect(() => {
    if (URL) {
      const audio = new Audio(URL);
      audio.volume = volume;
      audio.loop = loop;
      
      if (isPlaying) {
        audio.play().catch(error => {
          console.error('Failed to play audio:', error);
        });
      }

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [isPlaying, URL, volume, loop]);

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