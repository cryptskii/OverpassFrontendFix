"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const react_1 = __importStar(require("react"));
const useTonWallet_1 = require("../hooks/useTonWallet");
const ton_access_1 = require("@orbs-network/ton-access");
const ton_1 = require("@ton/ton");
const crypto_1 = require("@ton/crypto");
const core_1 = require("@ton/core");
const WalletInfo_1 = require("../components/WalletInfo");
const SendTransaction_1 = __importDefault(require("../components/SendTransaction"));
const Header_1 = require("../components/Header");
const Dashboard = () => {
    const [client, setClient] = (0, react_1.useState)(null);
    const [balance, setBalance] = (0, react_1.useState)('0');
    const { address: walletAddress } = (0, useTonWallet_1.useTonWallet)();
    (0, react_1.useEffect)(() => {
        const initTonAccess = async () => {
            const endpoint = await (0, ton_access_1.getHttpEndpoint)({ network: 'mainnet' });
            const newClient = new ton_1.TonClient({ endpoint });
            setClient(newClient);
            console.log('TON HTTP Endpoint:', endpoint);
        };
        initTonAccess();
    }, []);
    (0, react_1.useEffect)(() => {
        const fetchTokenBalance = async () => {
            if (walletAddress && client) {
                try {
                    const balance = await client.getBalance((0, core_1.address)(walletAddress));
                    setBalance((0, ton_1.fromNano)(balance));
                }
                catch (error) {
                    console.error("Error fetching balance:", error);
                }
            }
        };
        fetchTokenBalance();
    }, [walletAddress, client]);
    const sendTransaction = async () => {
        if (!client)
            return;
        try {
            let mnemonics = "word1 word2 ...".split(" ");
            let key = await (0, crypto_1.mnemonicToWalletKey)(mnemonics);
            let wallet = ton_1.WalletContractV4.create({ workchain: 0, publicKey: key.publicKey });
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
                            dest: (0, core_1.address)('EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N'),
                            value: (0, core_1.toNano)('1'),
                            ihrFee: BigInt(0),
                            fwdFee: BigInt(0),
                            createdLt: BigInt(0),
                            createdAt: 0,
                            forwardFee: BigInt(0),
                        },
                        body: (0, core_1.beginCell)().endCell(),
                    }]
            });
            console.log("Transaction sent successfully");
        }
        catch (error) {
            console.error("Error sending transaction:", error);
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Header_1.Header, null),
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("h1", null, "Dashboard"),
            react_1.default.createElement(WalletInfo_1.WalletInfo, null),
            react_1.default.createElement(Balance, { balance: balance }),
            react_1.default.createElement(SendTransaction_1.default, { onSend: sendTransaction }))));
};
exports.Dashboard = Dashboard;
exports.default = exports.Dashboard;
const Balance = ({ balance }) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Balance"),
        react_1.default.createElement("p", null,
            balance,
            " TON")));
};
//# sourceMappingURL=Dashboard.js.map