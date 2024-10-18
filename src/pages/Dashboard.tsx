// src/pages/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import { useTonWallet } from '../hooks/useTonWallet';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient, fromNano, Address } from '@ton/ton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WalletInfo from '../components/WalletInfo';
import SendTransaction from '../components/SendTransaction';
import TransactionHistory from '../components/TransactionHistory';
import Balance from '../components/Balance';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Transaction } from '../common/types';


const Dashboard: React.FC = () => {
  const [client, setClient] = useState<TonClient | null>(null);
  const [, setBalance] = useState<string>('0');
  const { address: walletAddress } = useTonWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const initTonAccess = async () => {
      try {
        const endpoint = await getHttpEndpoint({ network: 'mainnet' });
        const newClient = new TonClient({ endpoint });
        setClient(newClient);
        console.log('TON HTTP Endpoint:', endpoint);
      } catch (error) {
        console.error('Failed to initialize TonClient:', error);
      }
    };
    initTonAccess();
  }, []);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (walletAddress && client) {
        try {
          const balanceBigInt = await client.getBalance(Address.parse(walletAddress));
          setBalance(fromNano(balanceBigInt));
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };
    fetchTokenBalance();
  }, [walletAddress, client]);

  const fetchTransactions = async () => {
    if (walletAddress && client) {
      try {
        const fetchedTransactions = await client.getTransactions(Address.parse(walletAddress), {
          limit: 10,
          lt: '0',
        });
        const formattedTransactions: Transaction[] = fetchedTransactions.map((transaction, index) => {
          const isIncoming = transaction.inMessage?.info.src?.toString() !== walletAddress;

          return {
            id: index.toString(),
            date: new Date(transaction.now * 1000).toISOString(),
            timestamp: transaction.now * 1000,
            amount: Number(fromNano(transaction.inMessage?.info.type === 'internal' ? transaction.inMessage.info.value.coins : '0')),
            sender: transaction.inMessage?.info.src?.toString() || '',
            recipient: transaction.outMessages[0]?.info.dest?.toString() || '',
            status: 'completed',
            // Change 'type' to either 'incoming' or 'outgoing'
            type: isIncoming ? 'incoming' : 'outgoing',
          };
        });
        setTransactions(formattedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
  };

  return (
    <div className="pip-boy-container">
      <Header />
      <div className="pip-boy-screen">
        <main className="pip-boy-content">
          <div className="mb-4">
            <TonConnectButton />
          </div>

          <h1 className="text-3xl font-bold mb-6 pip-boy-header">Dashboard</h1>

          <div className="dashboard-section">
            {walletAddress ? (
              <>
                <WalletInfo />
                <Balance />
                <SendTransaction />
                <TransactionHistory transactions={transactions} fetchTransactions={fetchTransactions} />
              </>
            ) : (
              <p>Please connect your wallet to view your dashboard.</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
