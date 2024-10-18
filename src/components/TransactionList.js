"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TransactionList = ({ transactions }) => {
    return (react_1.default.createElement("div", { className: "bg-gray-700 p-4 rounded-lg shadow-md" },
        react_1.default.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Recent Transactions"),
        react_1.default.createElement("ul", { className: "space-y-2" }, transactions.map((tx) => (react_1.default.createElement("li", { key: tx.id, className: "flex justify-between items-center" },
            react_1.default.createElement("span", { className: tx.type === 'receive' ? 'text-green-400' : 'text-red-400' },
                tx.type === 'receive' ? '+' : '-',
                tx.amount,
                " TON"),
            react_1.default.createElement("span", { className: "text-sm text-gray-400" }, new Date(tx.timestamp).toLocaleString())))))));
};
exports.default = TransactionList;
//# sourceMappingURL=TransactionList.js.map