// src/pages/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import { useTonWallet } from '../hooks/useTonWallet';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient, WalletContractV4, fromNano, Address, beginCell, toNano, MessageRelaxed } from '@ton/ton';
import { mnemonicToWalletKey } from '@ton/crypto';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { WalletInfo } from '../components/WalletInfo'; // Named import
import SendTransaction from '../components/SendTransaction';
import TransactionHistory from '../components/TransactionHistory';
import Balance from '../components/Balance';
import { Transaction } from '../common/types';

interface DashboardProps {
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, fetchTransactions }) => {
  const [client, setClient] = useState<TonClient | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const { address: walletAddress } = useTonWallet();

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

  const sendTransaction = async () => {
    if (!client) return;

    try {
      const mnemonics = 'word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12'.split(' ');
      const key = await mnemonicToWalletKey(mnemonics);

      const wallet = WalletContractV4.create({ workchain: 0, publicKey: key.publicKey });
      const contract = client.open(wallet);

      const seqno = await contract.getSeqno();
      await contract.sendTransfer({
        seqno,
        secretKey: key.secretKey,
        messages: [
          {
            info: {
              type: 'internal',
              ihrDisabled: true,
              bounce: false,
              bounced: false,
              src: null,
              dest: Address.parse('EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N'),
              value: toNano('1'),
              ihrFee: BigInt(0),
              fwdFee: BigInt(0),
              createdLt: BigInt(0),
              createdAt: 0,
              forwardFee: BigInt(0),
            },
            body: beginCell().endCell(),
          } as unknown as MessageRelaxed,
        ],
      });
      console.log('Transaction sent successfully');
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <div className="Dashboard">
      <Header />
      <div className="container p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <WalletInfo />
        <Balance />
        <SendTransaction onSend={sendTransaction} />
        <TransactionHistory />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
