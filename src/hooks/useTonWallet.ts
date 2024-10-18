import { useTonConnectUI } from "@tonconnect/ui-react";
import { useState, useEffect } from "react";
import { TonClient as TonClientCore, Address, TonClient, WalletContractV4 } from "@ton/ton";
import { mnemonicNew, mnemonicToPrivateKey } from "@ton/crypto";
import { Transaction } from '../common/types';
// Create Client
const tonClient = new TonClient({
  endpoint: 'https://toncenter.com/api/v2/jsonRPC',
});

// Generate new key
let mnemonics: string[];
let keyPair: { publicKey: Buffer; secretKey: Buffer } | undefined;

(async () => {
  mnemonics = await mnemonicNew();
  keyPair = await mnemonicToPrivateKey(mnemonics);
})();

// Create wallet contract
let workchain = 0; // Usually you need a workchain 0
let wallet: WalletContractV4 | undefined;
let contract: ReturnType<TonClient['open']> | undefined;

(async () => {
  if (keyPair) {
    wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    contract = tonClient.open(wallet);
  }
})();

export const useTonWallet = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [client, setClient] = useState<TonClientCore | null>(null);

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange(async (wallet) => {
      if (wallet) {
        setAddress(wallet.account.address);
        const newClient = new TonClientCore({
          endpoint: "https://toncenter.com/api/v2/jsonRPC",
        });
        setClient(newClient);

        try {
          const balanceResult = await newClient.getBalance(Address.parse(wallet.account.address));
          setBalance(balanceResult.toString());
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance("0");
        }
      } else {
        setAddress(null);
        setBalance("0");
        setClient(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI]);

  useEffect(() => {
    tonConnectUI.openModal();
  }, [tonConnectUI]);

  const connectWallet = () => {
    tonConnectUI.connectWallet();
  };

  const disconnectWallet = () => {
    tonConnectUI.disconnect();
  };

  const sendTransaction = async (to: string, amount: string, payload?: string) => {
    if (!client || !address) return;

    try {
      const result = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
        messages: [
          {
            address: to,
            amount: amount,
            payload: payload,
          },
        ],
      });
      console.log("Transaction sent:", result);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return { address, balance, client, connectWallet, disconnectWallet, sendTransaction };
};