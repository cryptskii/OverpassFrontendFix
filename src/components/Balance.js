"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const useTonWallet_1 = require("../hooks/useTonWallet");
const ui_react_1 = require("@tonconnect/ui-react");
const Balance = () => {
    const { balance } = (0, useTonWallet_1.useTonWallet)();
    const [tonConnectUI] = (0, ui_react_1.useTonConnectUI)();
    const handleConnect = async () => {
        await tonConnectUI.connectWallet();
    };
    return (react_1.default.createElement("div", { className: "bg-gray-700 p-4 rounded-lg shadow-md" },
        react_1.default.createElement("h2", { className: "text-xl font-semibold mb-2" }, "Balance"),
        balance !== null ? (react_1.default.createElement("p", { className: "text-2xl font-bold" },
            balance,
            " TON")) : (react_1.default.createElement("button", { onClick: handleConnect, className: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" }, "Connect Wallet"))));
};
exports.default = Balance;
//# sourceMappingURL=Balance.js.map