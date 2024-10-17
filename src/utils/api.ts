import axios from 'axios';
import { useTonConnectUI } from '@tonconnect/ui-react';

export const fetchTransactions = async (address: string) => {
  const response = await axios.get(
    `https://tonapi.io/v2/accounts/${address}/transactions`,
  );
  return response.data;
};

// Composant avec TON Connect
const TransactionComponentWithTONConnect = () => {
  const [tonConnectUI] = useTonConnectUI();
  const connected = tonConnectUI.connected;
  const account = tonConnectUI.account;

  const handleFetchTransactions = async () => {
    if (connected && account) {
      try {
        const transactions = await fetchTransactions(account.address);
        console.log('Transactions:', transactions);
        // Traitez les transactions ici
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    } else {
      console.log('Please connect your wallet first');
    }
  };
  
};