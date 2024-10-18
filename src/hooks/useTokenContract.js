"use strict";
// ./hooks/useTokenContract.ts
Object.defineProperty(exports, "__esModule", { value: true });
const ton_1 = require("@ton/ton");
const crypto_1 = require("@ton/crypto");
// Create Client
const tonClient = new ton_1.TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
});
// Function to generate new key and create wallet contract
async function createWalletContract() {
    // Generate new key
    let mnemonics = await (0, crypto_1.mnemonicNew)();
    let keyPair = await (0, crypto_1.mnemonicToPrivateKey)(mnemonics);
    // Create wallet contract
    let workchain = 0; // Usually you need a workchain 0
    let wallet = ton_1.WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let contract = tonClient.open(wallet);
    return { contract, keyPair };
}
// Function to send transfer
async function sendTransfer(contract, keyPair) {
    await contract.sendTransfer({
        seqno: await contract.getSeqno(),
        secretKey: keyPair.secretKey,
        messages: [(0, ton_1.internal)({
                to: contract.address,
                value: '0',
                bounce: false,
                body: 'Debug message'
            })]
    });
}
// Usage example (uncomment to use)
// (async () => {
//   const { contract, keyPair } = await createWalletContract()
//   await sendTransfer(contract, keyPair)
// })()
//# sourceMappingURL=useTokenContract.js.map