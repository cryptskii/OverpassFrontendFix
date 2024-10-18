// src/components/WalletInfo.tsx

import React from 'react';
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react';

const WalletInfo: React.FC = () => {
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress(true); // Get user-friendly format

  return (
    wallet ? (
      <div>
        <p>Connected wallet: {wallet.device.platform}</p>
        <p>Address: {userFriendlyAddress}</p>
        <p>Device: {wallet.device.appName}</p>
      </div>
    ) : (
      <p>No wallet connected.</p>
    )
  );
};

export default WalletInfo; // Default export
