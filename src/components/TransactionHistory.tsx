import React from 'react';
import { useTonWallet } from '../hooks/useTonWallet';
import { fetchTransactions } from '../utils/api'; // Ensure this function is correctly implemented
import { Transaction } from '../common/types'; // Importing the correct Transaction type

interface TransactionHistoryProps {
  transactions: Transaction[]; // Now expects transactions passed as props
  fetchTransactions: () => Promise<void>; // Function to fetch transactions passed as prop
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, fetchTransactions }) => {
  const { address } = useTonWallet();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadTransactions = async () => {
      if (address) {
        try {
          setLoading(true);
          await fetchTransactions(); // Fetching transactions through the prop function
          setLoading(false);
        } catch (err) {
          setError('Failed to load transactions. Please try again later.');
          setLoading(false);
        }
      }
    };

    loadTransactions();
  }, [address, fetchTransactions]);

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
              <span className={tx.type === 'incoming' ? 'text-green-400' : 'text-red-400'}>
                {tx.type === 'incoming' ? '+' : '-'}{tx.amount} TON
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
