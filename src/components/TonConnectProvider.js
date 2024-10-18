"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TonConnectProvider = void 0;
const react_1 = __importDefault(require("react"));
const ui_react_1 = require("@tonconnect/ui-react");
const TonAccessProvider_1 = require("./TonAccessProvider");
const TonConnectProvider = ({ children }) => {
    return (react_1.default.createElement(ui_react_1.TonConnectUIProvider, { manifestUrl: "https://overpass-frontend-den9pqd7n-brandons-projects-d6012021.vercel.app/tonconnect-manifest.json" },
        react_1.default.createElement(TonAccessProvider_1.TonAccessProvider, null, children)));
};
exports.TonConnectProvider = TonConnectProvider;
//# sourceMappingURL=TonConnectProvider.js.map