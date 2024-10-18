import React, { useEffect, useState } from 'react';
import { useTonAddress } from '@tonconnect/ui-react'; 
import { useTonAccess } from './TonAccessProvider'; 
import TonWeb from 'tonweb';

const Balance: React.FC = () => {
  const userFriendlyAddress = useTonAddress(true);
  const { tonweb } = useTonAccess();
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    const fetchBalance = async () => {
      if (userFriendlyAddress && tonweb) {
        try {
          const balanceBigInt = await tonweb.getBalance(userFriendlyAddress);
          const balanceFormatted = TonWeb.utils.fromNano(balanceBigInt);
          setBalance(balanceFormatted);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };
    fetchBalance();
  }, [userFriendlyAddress, tonweb]);

  return (
    <div className="balance-container">
      <h2 className="balance-label">Balance</h2>
      <p className="balance-value">{balance} TON</p>
    </div>
  );
};

export default Balance;
