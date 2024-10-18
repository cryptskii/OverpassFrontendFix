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
const react_1 = __importStar(require("react"));
const ui_react_1 = require("@tonconnect/ui-react");
const TonAccessProvider_1 = require("./TonAccessProvider");
const tonweb_1 = __importDefault(require("tonweb"));
const SendTransaction = ({ onSend }) => {
    const [tonConnectUI] = (0, ui_react_1.useTonConnectUI)();
    const { tonweb } = (0, TonAccessProvider_1.useTonAccess)();
    const [recipient, setRecipient] = (0, react_1.useState)('');
    const [amount, setAmount] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)(null);
    const [success, setSuccess] = (0, react_1.useState)(null);
    const [isConfirming, setIsConfirming] = (0, react_1.useState)(false);
    const [transactionStatus, setTransactionStatus] = (0, react_1.useState)(null);
    const validateInputs = () => {
        if (!recipient) {
            setError('Please enter a recipient address');
            return false;
        }
        if (!amount || parseFloat(amount) <= 0) {
            setError('Please enter a valid amount');
            return false;
        }
        return true;
    };
    const handleConfirm = () => {
        if (validateInputs()) {
            setIsConfirming(true);
            setError(null);
        }
    };
    const handleCancel = () => {
        setIsConfirming(false);
        setError(null);
    };
    const handleSend = async () => {
        if (!tonConnectUI.connected || !tonweb) {
            setError('Please connect your wallet first');
            return;
        }
        try {
            setTransactionStatus('Preparing transaction...');
            const amountNano = tonweb_1.default.utils.toNano(amount);
            const transaction = {
                validUntil: Math.floor(Date.now() / 1000) + 60 * 20, // Valid for 20 minutes
                messages: [
                    {
                        address: recipient,
                        amount: amountNano.toString(),
                    },
                ],
            };
            setTransactionStatus('Sending transaction...');
            const result = await tonConnectUI.sendTransaction(transaction);
            setSuccess(`Transaction sent successfully. Hash: ${result.boc}`);
            setTransactionStatus('Transaction completed');
            setError(null);
            setIsConfirming(false);
            setRecipient('');
            setAmount('');
            if (onSend) {
                onSend();
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? `Failed to send transaction: ${err.message}` : `Failed to send transaction: ${String(err)}`;
            setError(errorMessage);
            setTransactionStatus(null);
            setSuccess(null);
        }
    };
    return (react_1.default.createElement("div", { className: "bg-gray-700 p-4 rounded-lg shadow-md" },
        react_1.default.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Send Transaction"),
        !isConfirming ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "mb-4" },
                react_1.default.createElement("label", { htmlFor: "recipient", className: "block mb-2" }, "Recipient Address"),
                react_1.default.createElement("input", { id: "recipient", type: "text", value: recipient, onChange: (e) => setRecipient(e.target.value), className: "w-full p-2 bg-gray-800 rounded" })),
            react_1.default.createElement("div", { className: "mb-4" },
                react_1.default.createElement("label", { htmlFor: "amount", className: "block mb-2" }, "Amount (TON)"),
                react_1.default.createElement("input", { id: "amount", type: "number", value: amount, onChange: (e) => setAmount(e.target.value), className: "w-full p-2 bg-gray-800 rounded" })),
            react_1.default.createElement("button", { onClick: handleConfirm, className: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" }, "Confirm Transaction"))) : (react_1.default.createElement("div", { className: "mb-4" },
            react_1.default.createElement("h3", { className: "text-lg font-semibold mb-2" }, "Confirm Transaction"),
            react_1.default.createElement("p", null,
                "Recipient: ",
                recipient),
            react_1.default.createElement("p", null,
                "Amount: ",
                amount,
                " TON"),
            react_1.default.createElement("div", { className: "mt-4" },
                react_1.default.createElement("button", { onClick: handleSend, className: "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2" }, "Send"),
                react_1.default.createElement("button", { onClick: handleCancel, className: "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" }, "Cancel")))),
        error && react_1.default.createElement("p", { className: "text-red-500 mt-2" }, error),
        success && react_1.default.createElement("p", { className: "text-green-500 mt-2" }, success),
        transactionStatus && react_1.default.createElement("p", { className: "text-blue-500 mt-2" }, transactionStatus)));
};
exports.default = SendTransaction;
//# sourceMappingURL=SendTransaction.js.map