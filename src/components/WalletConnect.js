"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_react_1 = require("@tonconnect/ui-react");
const WalletConnect = () => {
    const [tonConnectUI] = (0, ui_react_1.useTonConnectUI)();
    return (react_1.default.createElement("button", { className: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded", onClick: () => tonConnectUI.connectWallet() }, "Connect Wallet"));
};
exports.default = WalletConnect;
//# sourceMappingURL=WalletConnect.js.map