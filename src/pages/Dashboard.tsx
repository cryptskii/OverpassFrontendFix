import React, { useEffect, useState } from 'react'
import { useTonWallet } from '../hooks/useTonWallet'
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, WalletContractV4, fromNano, Address, MessageRelaxed } from "@ton/ton";
import { mnemonicToWalletKey } from "@ton/crypto";
import { beginCell, toNano } from "@ton/core";

const Dashboard: React.FC = () => {
  const { address } = useTonWallet();
  const [balance, setBalance] = useState<string>('0');
  const [client, setClient] = useState<TonClient | null>(null);

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
      if (address && client) {
        try {
          const balance = await client.getBalance(Address.parse(address));
          setBalance(fromNano(balance));
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };
    fetchTokenBalance();
  }, [address, client]);

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
            dest: Address.parse('EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N'),
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
  };  return (    <div>
      <h1>Dashboard</h1>
      <Balance balance={balance} />
      <SendTransaction onSend={sendTransaction} />
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

const SendTransaction: React.FC<SendTransactionProps> = ({ onSend }) => {
  return (
    <div>
      <h2>Send Transaction</h2>
      <button onClick={onSend}>Send</button>
    </div>
  );
};