"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTonWallet = void 0;
const ui_react_1 = require("@tonconnect/ui-react");
const react_1 = require("react");
const ton_1 = require("@ton/ton");
const crypto_1 = require("@ton/crypto");
// Create Client
const tonClient = new ton_1.TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
});
// Generate new key
let mnemonics;
let keyPair;
(async () => {
    mnemonics = await (0, crypto_1.mnemonicNew)();
    keyPair = await (0, crypto_1.mnemonicToPrivateKey)(mnemonics);
})();
// Create wallet contract
let workchain = 0; // Usually you need a workchain 0
let wallet;
let contract;
(async () => {
    wallet = ton_1.WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    contract = tonClient.open(wallet);
})();
const useTonWallet = () => {
    const [tonConnectUI] = (0, ui_react_1.useTonConnectUI)();
    const [address, setAddress] = (0, react_1.useState)(null);
    const [balance, setBalance] = (0, react_1.useState)("0");
    const [client, setClient] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const unsubscribe = tonConnectUI.onStatusChange(async (wallet) => {
            if (wallet) {
                setAddress(wallet.account.address);
                const newClient = new ton_1.TonClient({
                    endpoint: "https://toncenter.com/api/v2/jsonRPC",
                });
                setClient(newClient);
                try {
                    const balanceResult = await newClient.getBalance(ton_1.Address.parse(wallet.account.address));
                    setBalance(balanceResult.toString());
                }
                catch (error) {
                    console.error("Error fetching balance:", error);
                    setBalance("0");
                }
            }
            else {
                setAddress(null);
                setBalance("0");
                setClient(null);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [tonConnectUI]);
    (0, react_1.useEffect)(() => {
        tonConnectUI.openModal();
    }, [tonConnectUI]);
    const connectWallet = () => {
        tonConnectUI.connectWallet();
    };
    const disconnectWallet = () => {
        tonConnectUI.disconnect();
    };
    const sendTransaction = async (to, amount, payload) => {
        if (!client || !address)
            return;
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
        }
        catch (error) {
            console.error("Error sending transaction:", error);
        }
    };
    return { address, balance, client, connectWallet, disconnectWallet, sendTransaction };
};
exports.useTonWallet = useTonWallet;
//# sourceMappingURL=useTonWallet.js.map