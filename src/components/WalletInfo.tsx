// src/components/WalletInfo.tsx

import React from 'react';
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react';

export const WalletInfo: React.FC = () => {
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress(true); // Get user-friendly format

  return (
    wallet ? (
      <div className="bg-gray-700 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Wallet Information</h2>
        <p><strong>Platform:</strong> {wallet.device.platform}</p>
        <p><strong>Device:</strong> {wallet.device.appName}</p>
        <p><strong>Address:</strong> {userFriendlyAddress}</p>
      </div>
    ) : (
      <p className="text-red-500">No wallet connected.</p>
    )
  );
};
