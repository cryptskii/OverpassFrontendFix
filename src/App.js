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
const react_router_dom_1 = require("react-router-dom");
const ui_react_1 = require("@tonconnect/ui-react");
const TonAccessProvider_1 = require("./components/TonAccessProvider");
const Header_1 = __importDefault(require("./components/Header"));
const Footer_1 = __importDefault(require("./components/Footer"));
const Home_1 = __importDefault(require("./pages/Home"));
const About_1 = __importDefault(require("./pages/About"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
// Import these modules once they are available
// import logoImage from './assets/images/OP_logo_Pip2.png';
// import './styles/App.css';
// import { useTonConnect } from './hooks/useTonConnect';
// import { useTheme } from './hooks/useTheme';
// import LoadingSpinner from './components/LoadingSpinner';
const App = () => {
    // Commented out due to missing imports
    // const { walletInfo, isLoading, error } = useTonConnect();
    const [tonConnectUI] = (0, ui_react_1.useTonConnectUI)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    // const { theme, toggleTheme } = useTheme();
    const [isInitialized, setIsInitialized] = (0, react_1.useState)(false);
    // Placeholder values
    const connected = false;
    const isLoading = false;
    const error = null;
    const theme = 'light';
    (0, react_1.useEffect)(() => {
        const initializeApp = async () => {
            try {
                // Simulating an asynchronous initialization process
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsInitialized(true);
            }
            catch (error) {
                console.error('Failed to initialize app:', error);
                // Handle initialization error
            }
        };
        initializeApp();
    }, []);
    (0, react_1.useEffect)(() => {
        document.title = connected ? 'PipBoy Wallet' : 'PipBoy Wallet - Not Connected';
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = connected ? '/logo.png' : '/logo-not-connected.png';
        }
    }, [connected, theme]);
    const handleConnect = async () => {
        try {
            await tonConnectUI.openModal();
        }
        catch (error) {
            console.error('Failed to connect wallet:', error);
            // Handle connection error
        }
    };
    const handleNavigate = () => {
        if (connected) {
            navigate('/dashboard');
        }
        else {
            navigate('/');
        }
    };
    if (!isInitialized || isLoading) {
        return react_1.default.createElement("div", null, "Loading..."); // Replace with LoadingSpinner once available
    }
    if (error) {
        return react_1.default.createElement("div", null,
            "Error: ",
            String(error));
    }
    return (react_1.default.createElement("div", { className: `App ${theme}` },
        react_1.default.createElement(ui_react_1.TonConnectUIProvider, { manifestUrl: "https://overpass-channels-czhd-git-crypskii-brandons-projects-d6012021.vercel.app/tonconnect-manifest.json" },
            react_1.default.createElement(TonAccessProvider_1.TonAccessProvider, null,
                react_1.default.createElement("div", { className: "pip-boy-container" },
                    react_1.default.createElement("div", { className: "pip-boy-screen scanlines" },
                        react_1.default.createElement(Header_1.default, null),
                        react_1.default.createElement("main", { className: "pip-boy-content" },
                            react_1.default.createElement(react_router_dom_1.Routes, null,
                                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Home_1.default, null) }),
                                react_1.default.createElement(react_router_dom_1.Route, { path: "/about", element: react_1.default.createElement(About_1.default, null) }),
                                react_1.default.createElement(react_router_dom_1.Route, { path: "/dashboard", element: react_1.default.createElement(Dashboard_1.default, null) }))),
                        react_1.default.createElement(Footer_1.default, null))),
                react_1.default.createElement("header", { className: "App-header" },
                    react_1.default.createElement("h1", null, "PipBoy Wallet"),
                    react_1.default.createElement(ui_react_1.TonConnectButton, null),
                    react_1.default.createElement("div", { className: "App-buttons" }, !connected ? (react_1.default.createElement("button", { onClick: handleConnect }, "Connect")) : (react_1.default.createElement("button", { onClick: handleNavigate }, "Go to Dashboard"))),
                    react_1.default.createElement("div", { className: "App-status" },
                        react_1.default.createElement("p", null,
                            "Connected: ",
                            connected ? 'Yes' : 'No'))),
                react_1.default.createElement("div", { className: "App-content" },
                    react_1.default.createElement(react_router_dom_1.Outlet, null))))));
};
exports.default = App;
//# sourceMappingURL=App.js.map