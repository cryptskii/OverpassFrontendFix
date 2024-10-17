import React, { useEffect, useState } from 'react'
import { useTonWallet } from '../hooks/useTonWallet'
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, WalletContractV4, fromNano, Address, MessageRelaxed } from "@ton/ton";
import { mnemonicToWalletKey } from "@ton/crypto";
import { address, beginCell, toNano } from "@ton/core";
import { WalletInfo } from '../components/WalletInfo';
import SendTransaction from '../components/SendTransaction';
import { Header } from '../components/Header';

export const Dashboard: React.FC = () => {
  const [client, setClient] = useState<TonClient | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const { address: walletAddress } = useTonWallet();

  useEffect(() => {
    const initTonAccess = async () => {
      const endpoint = await getHttpEndpoint({ network: 'mainnet' });
      const newClient = new TonClient({ endpoint });
      setClient(newClient);
      console.log('TON HTTP Endpoint:', endpoint);
    };
    initTonAccess();
  }, []);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (walletAddress && client) {
        try {
          const balance = await client.getBalance(address(walletAddress));
          setBalance(fromNano(balance));
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };
    fetchTokenBalance();
  }, [walletAddress, client]);

  const sendTransaction = async () => {
    if (!client) return;

    try {
      let mnemonics = "word1 word2 ...".split(" ");
      let key = await mnemonicToWalletKey(mnemonics);

      let wallet = WalletContractV4.create({ workchain: 0, publicKey: key.publicKey });
      let contract = client.open(wallet);

      let seqno = await contract.getSeqno();
      await contract.sendTransfer({
        seqno,
        secretKey: key.secretKey,
        messages: [{
          info: {
            type: 'internal',
            ihrDisabled: true,
            bounce: false,
            bounced: false,
            src: null,
            dest: address('EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N'),
            value: toNano('1'),
            ihrFee: BigInt(0),
            fwdFee: BigInt(0),
            createdLt: BigInt(0),
            createdAt: 0,
            forwardFee: BigInt(0),
          },
          body: beginCell().endCell(),
        } as unknown as MessageRelaxed]
      })
      console.log("Transaction sent successfully");
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Dashboard</h1>
        <WalletInfo />
        <Balance balance={balance} />
        <SendTransaction onSend={sendTransaction} />
      </div>
    </div>
  );
};

export default Dashboard;

type BalanceProps = {
  balance: string;
};

const Balance: React.FC<BalanceProps> = ({ balance }) => {
  return (
    <div>
      <h2>Balance</h2>
      <p>{balance} TON</p>
    </div>
  );
};

type SendTransactionProps = {
  onSend: () => Promise<void>;
};
