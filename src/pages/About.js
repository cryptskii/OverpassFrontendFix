"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const About = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", { className: "text-3xl font-bold mb-4" }, "About Overpass"),
        react_1.default.createElement("p", { className: "mb-4" }, "Overpass is a cutting-edge platform built on the TON blockchain, designed to provide users with a seamless and efficient way to manage their TON transactions."),
        react_1.default.createElement("p", { className: "mb-4" }, "Our mission is to simplify the process of sending and receiving TON, while ensuring the highest levels of security and transparency."),
        react_1.default.createElement("h2", { className: "text-2xl font-semibold mb-2" }, "Key Features:"),
        react_1.default.createElement("ul", { className: "list-disc list-inside mb-4" },
            react_1.default.createElement("li", null, "Easy wallet connection using TonConnect"),
            react_1.default.createElement("li", null, "Real-time balance updates"),
            react_1.default.createElement("li", null, "Simplified transaction history"),
            react_1.default.createElement("li", null, "Secure and fast TON transfers")),
        react_1.default.createElement("p", null, "Join us in revolutionizing the way you interact with the TON blockchain!")));
};
exports.default = About;
//# sourceMappingURL=About.js.map