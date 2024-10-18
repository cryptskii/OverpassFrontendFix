"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const react_router_dom_1 = require("react-router-dom");
const ui_react_1 = require("@tonconnect/ui-react");
const App_1 = __importDefault(require("./App"));
require("./styles/globals.css");
require("./styles/PipBoyWalletDashboard.css");
client_1.default.createRoot(document.getElementById('root')).render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(ui_react_1.TonConnectUIProvider, { manifestUrl: "/tonconnect-manifest.json" },
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(App_1.default, null)))));
//# sourceMappingURL=main.js.map