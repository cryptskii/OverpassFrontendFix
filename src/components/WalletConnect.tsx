// src/components/WalletConnect.tsx

import React from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

const WalletConnect: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      onClick={() => tonConnectUI.connectWallet()}
    >
      Connect Wallet
    </button>
  );
};

export default WalletConnect; // Default export
