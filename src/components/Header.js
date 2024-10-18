"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const WalletConnect_1 = __importDefault(require("./WalletConnect"));
const Header = () => {
    return (react_1.default.createElement("header", { className: "pip-boy-header" },
        react_1.default.createElement("h1", null, "Overpass"),
        react_1.default.createElement("nav", { className: "pip-boy-nav" },
            react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "pip-boy-button" }, "Home"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/about", className: "pip-boy-button" }, "About"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/dashboard", className: "pip-boy-button" }, "Dashboard")),
        react_1.default.createElement(WalletConnect_1.default, null)));
};
exports.Header = Header;
exports.default = exports.Header;
//# sourceMappingURL=Header.js.map