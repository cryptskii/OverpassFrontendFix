import React, { useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useTonAccess } from './TonAccessProvider';
import TonWeb from 'tonweb';

const SendTransaction: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null); // Handle errors
  const [success, setSuccess] = useState<string | null>(null); // Handle success
  const { tonweb } = useTonAccess();
  const [tonConnectUI] = useTonConnectUI();

  const handleConfirm = () => setIsConfirming(true);

  const handleSend = async () => {
    setError(null);
    setSuccess(null);
    
    if (!tonConnectUI.connected || !tonweb) {
      setError('Please connect your wallet first.');
      return;
    }

    if (!recipient || !amount || parseFloat(amount) <= 0) {
      setError('Invalid recipient address or amount.');
      return;
    }

    try {
      const amountNano = TonWeb.utils.toNano(amount);
      await tonConnectUI.sendTransaction({
        messages: [
          {
            address: recipient,
            amount: amountNano.toString(),
          },
        ],
        validUntil: Math.floor(Date.now() / 1000) + 60 * 20,
      });
      setSuccess('Transaction sent successfully!');
      setIsConfirming(false);
      setRecipient('');
      setAmount('');
    } catch (error) {
      setError('Failed to send transaction.');
      console.error("Failed to send transaction:", error);
    }
  };

  return (
    <div className="transaction-form bg-gray-700 p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Send Transaction</h2>
      
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
        className="pip-boy-input bg-black text-green-500 border-green-500 border p-2 rounded"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (TON)"
        className="pip-boy-input bg-black text-green-500 border-green-500 border p-2 rounded mt-4"
      />
      
      {!isConfirming ? (
        <button className="pip-boy-button bg-green-500 text-black mt-4" onClick={handleConfirm}>
          Confirm Transaction
        </button>
      ) : (
        <div className="mt-4">
          <button className="pip-boy-button bg-green-500 text-black mr-2" onClick={handleSend}>Send</button>
          <button className="pip-boy-button bg-red-500 text-black" onClick={() => setIsConfirming(false)}>Cancel</button>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default SendTransaction;
