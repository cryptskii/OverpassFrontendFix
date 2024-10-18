"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletInfo = void 0;
const react_1 = __importDefault(require("react"));
const ui_react_1 = require("@tonconnect/ui-react");
const WalletInfo = () => {
    const wallet = (0, ui_react_1.useTonWallet)();
    const userFriendlyAddress = (0, ui_react_1.useTonAddress)(true); // Get user-friendly format
    return (wallet ? (react_1.default.createElement("div", null,
        react_1.default.createElement("p", null,
            "Connected wallet: ",
            wallet.device.platform),
        react_1.default.createElement("p", null,
            "Address: ",
            userFriendlyAddress),
        react_1.default.createElement("p", null,
            "Device: ",
            wallet.device.appName))) : (react_1.default.createElement("p", null, "No wallet connected.")));
};
exports.WalletInfo = WalletInfo;
//# sourceMappingURL=WalletInfo.js.map