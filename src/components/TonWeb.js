"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = App;
exports.ConnectTONButton = ConnectTONButton;
exports.connectWallet = connectWallet;
const react_1 = __importDefault(require("react"));
const tonweb_1 = __importDefault(require("tonweb"));
const tonweb = new tonweb_1.default();
// Example function to connect to a TON wallet
async function connectWallet() {
    try {
        const wallet = tonweb.wallet.create({});
        if (wallet.address) {
            console.log("Wallet Address:", wallet.address.toString(true, true, true));
        }
        else {
            console.error("Wallet address is undefined");
        }
    }
    catch (error) {
        console.error("Error connecting wallet:", error);
    }
}
function ConnectTONButton() {
    return react_1.default.createElement("button", { onClick: connectWallet }, "Connect TON Wallet");
}
function App() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(ConnectTONButton, null)));
}
exports.default = App;
//# sourceMappingURL=TonWeb.js.map