"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTransactions = void 0;
const axios_1 = __importDefault(require("axios"));
const ui_react_1 = require("@tonconnect/ui-react");
const fetchTransactions = async (address) => {
    const response = await axios_1.default.get(`https://tonapi.io/v2/accounts/${address}/transactions`);
    return response.data;
};
exports.fetchTransactions = fetchTransactions;
// Composant avec TON Connect
const TransactionComponentWithTONConnect = () => {
    const [tonConnectUI] = (0, ui_react_1.useTonConnectUI)();
    const connected = tonConnectUI.connected;
    const account = tonConnectUI.account;
    const handleFetchTransactions = async () => {
        if (connected && account) {
            try {
                const transactions = await (0, exports.fetchTransactions)(account.address);
                console.log('Transactions:', transactions);
                // Traitez les transactions ici
            }
            catch (error) {
                console.error('Error fetching transactions:', error);
            }
        }
        else {
            console.log('Please connect your wallet first');
        }
    };
};
//# sourceMappingURL=api.js.map