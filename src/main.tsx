import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './App';
import AudioPlayer from './components/AudioPlayer';

/// This automatically place the background music and infinite loop plays it:
const audio = new Audio("/assets/AWESOME.mp3");
audio.play();


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AudioPlayer src="/assets/AWESOME.mp3" isPlaying={true} volume={1} loop={true} />
    <BrowserRouter>
      <TonConnectUIProvider manifestUrl="https://ovp-eight.vercel.app/tonconnect-manifest.json">
        <App />
      </TonConnectUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
