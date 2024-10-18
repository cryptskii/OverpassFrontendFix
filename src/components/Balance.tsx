// src/components/Balance.tsx

import React, { useEffect, useState } from 'react';
import { useTonAddress } from '@tonconnect/ui-react'; // Import useTonAddress
import { useTonAccess } from './TonAccessProvider'; // Adjust the import path as needed


const Balance: React.FC = () => {
  const userFriendlyAddress = useTonAddress(true); // Retrieve the connected wallet's address in a user-friendly format
  const { tonweb } = useTonAccess(); // Access the TonWeb instance from context
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    const fetchBalance = async () => {
      if (userFriendlyAddress && tonweb) {
        try {
          // Fetch the balance in nanoTON
          const balanceBigInt = await tonweb.getBalance(userFriendlyAddress);

          // Convert nanoTON to TON using TonWeb's utility function
          const balanceFormatted = tonweb.utils.fromNano(balanceBigInt);

          setBalance(balanceFormatted);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();
  }, [userFriendlyAddress, tonweb]);

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-2">Balance</h2>
      <p className="text-2xl font-bold">{balance} TON</p>
    </div>
  );
};

export default Balance;
