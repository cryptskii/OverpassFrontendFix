"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Home = () => {
    return (react_1.default.createElement("div", { className: "text-center" },
        react_1.default.createElement("h1", { className: "text-4xl font-bold mb-4" }, "Welcome to Overpass"),
        react_1.default.createElement("p", { className: "text-xl mb-8" }, "A decentralized platform for seamless TON transactions"),
        react_1.default.createElement(react_router_dom_1.Link, { to: "/dashboard", className: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" }, "Get Started")));
};
exports.default = Home;
//# sourceMappingURL=Home.js.map