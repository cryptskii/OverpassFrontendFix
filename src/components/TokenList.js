"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ./TokenList.tsx
const react_1 = __importDefault(require("react"));
const TokenList = ({ tokens }) => {
    return (react_1.default.createElement("div", { className: "bg-gray-700 p-4 rounded-lg shadow-md" },
        react_1.default.createElement("h2", { className: "text-xl font-semibold mb-2" }, "Tokens"),
        react_1.default.createElement("ul", { className: "space-y-2" }, tokens.map((token, index) => (react_1.default.createElement("li", { key: index, className: "flex justify-between items-center" },
            react_1.default.createElement("span", { className: "text-lg font-semibold" }, token.name),
            react_1.default.createElement("span", { className: "text-sm text-gray-400" }, token.symbol),
            react_1.default.createElement("span", { className: "text-lg font-semibold" }, token.balance)))))));
};
exports.default = TokenList;
//# sourceMappingURL=TokenList.js.map