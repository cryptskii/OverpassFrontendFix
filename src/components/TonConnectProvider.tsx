// src/components/TonConnectProvider.tsx

import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { TonAccessProvider } from './TonAccessProvider'; // Adjust the path as needed

interface TonConnectProviderProps {
  children: React.ReactNode;
}

const TonConnectProvider: React.FC<TonConnectProviderProps> = ({ children }) => {
  return (
    <TonConnectUIProvider manifestUrl="https://ovp-eight.vercel.app/tonconnect-manifest.json"> // Adjust the URL as needed
      <TonAccessProvider>
        {children}
      </TonAccessProvider>
    </TonConnectUIProvider>
  );
};

export default TonConnectProvider;
