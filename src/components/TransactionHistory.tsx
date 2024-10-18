// src/components/TransactionHistory.tsx

import React from 'react';
import { useTonWallet } from '../hooks/useTonWallet';
import { fetchTransactions } from '../utils/api'; // Ensure this function is correctly implemented

interface Transaction {
  id: string;
  amount: string;
  type: 'send' | 'receive';
  address: string;
  timestamp: number;
}

const TransactionHistory: React.FC = () => {
  const { address } = useTonWallet();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadTransactions = async () => {
      if (address) {
        try {
          setLoading(true);
          const txs = await fetchTransactions(address, false); // Assuming mainnet by default
          setTransactions(txs);
          setLoading(false);
        } catch (err) {
          setError('Failed to load transactions. Please try again later.');
          setLoading(false);
        }
      }
    };

    loadTransactions();
  }, [address]);

  if (loading) {
    return <p>Loading transaction history...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((tx) => (
            <li key={tx.id} className="flex justify-between items-center border-b border-gray-600 py-2">
              <span className={tx.type === 'receive' ? 'text-green-400' : 'text-red-400'}>
                {tx.type === 'receive' ? '+' : '-'}{tx.amount} TON
              </span>
              <span className="text-sm text-gray-400">{new Date(tx.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;
