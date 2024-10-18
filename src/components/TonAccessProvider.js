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
exports.useTonAccess = exports.TonAccessProvider = void 0;
const react_1 = __importStar(require("react"));
const tonweb_1 = __importDefault(require("tonweb"));
const ton_access_1 = require("@orbs-network/ton-access");
const TonAccessContext = (0, react_1.createContext)({ tonweb: null });
const TonAccessProvider = ({ children }) => {
    const [tonweb, setTonweb] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const initializeTonAccess = async () => {
            try {
                const endpoint = await (0, ton_access_1.getHttpEndpoint)();
                const newTonweb = new tonweb_1.default(new tonweb_1.default.HttpProvider(endpoint));
                setTonweb(newTonweb);
                console.log('TonAccess initialized successfully');
            }
            catch (error) {
                console.error('Failed to initialize TonAccess:', error);
            }
        };
        initializeTonAccess();
    }, []);
    return (react_1.default.createElement(TonAccessContext.Provider, { value: { tonweb } }, children));
};
exports.TonAccessProvider = TonAccessProvider;
// Export the hook as a named export
const useTonAccess = () => (0, react_1.useContext)(TonAccessContext);
exports.useTonAccess = useTonAccess;
//# sourceMappingURL=TonAccessProvider.js.map