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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const useTonWallet_1 = require("../hooks/useTonWallet");
const api_1 = require("../utils/api");
const TransactionHistory = () => {
    const { address } = (0, useTonWallet_1.useTonWallet)();
    const [transactions, setTransactions] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const loadTransactions = async () => {
            if (address) {
                try {
                    setLoading(true);
                    const txs = await (0, api_1.fetchTransactions)(address);
                    setTransactions(txs);
                    setLoading(false);
                }
                catch (err) {
                    setError('Failed to load transactions. Please try again later.');
                    setLoading(false);
                }
            }
        };
        loadTransactions();
    }, [address]);
    if (loading) {
        return react_1.default.createElement("p", null, "Loading transaction history...");
    }
    if (error) {
        return react_1.default.createElement("p", { className: "text-red-500" }, error);
    }
    return (react_1.default.createElement("div", { className: "bg-gray-700 p-4 rounded-lg shadow-md" },
        react_1.default.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Transaction History"),
        transactions.length === 0 ? (react_1.default.createElement("p", null, "No transactions found.")) : (react_1.default.createElement("ul", { className: "space-y-2" }, transactions.map((tx) => (react_1.default.createElement("li", { key: tx.id, className: "flex justify-between items-center border-b border-gray-600 py-2" },
            react_1.default.createElement("span", { className: tx.type === 'receive' ? 'text-green-400' : 'text-red-400' },
                tx.type === 'receive' ? '+' : '-',
                tx.amount,
                " TON"),
            react_1.default.createElement("span", { className: "text-sm text-gray-400" }, new Date(tx.timestamp).toLocaleString()))))))));
};
exports.default = TransactionHistory;
//# sourceMappingURL=TransactionHistory.js.map