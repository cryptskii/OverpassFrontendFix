"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const recharts_1 = require("recharts");
const useTonWallet_1 = require("../hooks/useTonWallet");
const api_1 = require("../utils/api");
const AnalyticsReport = () => {
    const { address } = (0, useTonWallet_1.useTonWallet)();
    const [transactionData, setTransactionData] = react_1.default.useState({});
    const [loading, setLoading] = react_1.default.useState(true);
    const [error, setError] = react_1.default.useState(null);
    react_1.default.useEffect(() => {
        const loadTransactions = async () => {
            if (address) {
                try {
                    setLoading(true);
                    const txs = await (0, api_1.fetchTransactions)(address);
                    processTransactionData(txs);
                    setLoading(false);
                }
                catch (err) {
                    setError('Failed to load transaction data. Please try again later.');
                    setLoading(false);
                }
            }
        };
        loadTransactions();
    }, [address]);
    const processTransactionData = (transactions) => {
        const monthlyVolume = {};
        const transactionTypes = { send: 0, receive: 0 };
        const dailyTransactionCount = {};
        const hourlyDistribution = {};
        let totalVolume = 0;
        let largestTransaction = 0;
        let smallestTransaction = Infinity;
        let totalFees = 0;
        transactions.forEach((tx) => {
            const date = new Date(tx.timestamp);
            const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
            const dayMonthYear = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            const hour = date.getHours();
            const amount = parseFloat(tx.amount);
            monthlyVolume[monthYear] = (monthlyVolume[monthYear] || 0) + amount;
            transactionTypes[tx.type]++;
            dailyTransactionCount[dayMonthYear] = (dailyTransactionCount[dayMonthYear] || 0) + 1;
            hourlyDistribution[hour] = (hourlyDistribution[hour] || 0) + 1;
            totalVolume += amount;
            largestTransaction = Math.max(largestTransaction, amount);
            smallestTransaction = Math.min(smallestTransaction, amount);
            totalFees += parseFloat(tx.fee || '0');
        });
        const volumeData = Object.entries(monthlyVolume).map(([date, volume]) => ({ date, volume }));
        const typeData = Object.entries(transactionTypes).map(([type, count]) => ({ type, count }));
        const activityData = Object.entries(dailyTransactionCount).map(([date, count]) => ({ date, count }));
        const hourlyData = Object.entries(hourlyDistribution).map(([hour, count]) => ({ hour: parseInt(hour), count }));
        setTransactionData({
            volumeData,
            typeData,
            activityData,
            hourlyData,
            totalTransactions: transactions.length,
            totalVolume: totalVolume.toFixed(2),
            largestTransaction: largestTransaction.toFixed(2),
            smallestTransaction: smallestTransaction.toFixed(2),
            averageTransactionSize: (totalVolume / transactions.length).toFixed(2),
            totalFees: totalFees.toFixed(2),
            averageFee: (totalFees / transactions.length).toFixed(2)
        });
    };
    if (loading) {
        return react_1.default.createElement("p", null, "Loading analytics...");
    }
    if (error) {
        return react_1.default.createElement("p", { className: "text-red-500" }, error);
    }
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (react_1.default.createElement("div", { className: "bg-gray-700 p-4 rounded-lg shadow-md" },
        react_1.default.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Transaction Analytics"),
        react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" },
            react_1.default.createElement("div", { className: "bg-gray-800 p-3 rounded" },
                react_1.default.createElement("h3", { className: "text-lg font-semibold mb-2" }, "Total Transactions"),
                react_1.default.createElement("p", { className: "text-2xl" }, transactionData.totalTransactions)),
            react_1.default.createElement("div", { className: "bg-gray-800 p-3 rounded" },
                react_1.default.createElement("h3", { className: "text-lg font-semibold mb-2" }, "Total Volume"),
                react_1.default.createElement("p", { className: "text-2xl" },
                    transactionData.totalVolume,
                    " TON")),
            react_1.default.createElement("div", { className: "bg-gray-800 p-3 rounded" },
                react_1.default.createElement("h3", { className: "text-lg font-semibold mb-2" }, "Average Transaction Size"),
                react_1.default.createElement("p", { className: "text-2xl" },
                    transactionData.averageTransactionSize,
                    " TON")),
            react_1.default.createElement("div", { className: "bg-gray-800 p-3 rounded" },
                react_1.default.createElement("h3", { className: "text-lg font-semibold mb-2" }, "Largest Transaction"),
                react_1.default.createElement("p", { className: "text-2xl" },
                    transactionData.largestTransaction,
                    " TON")),
            react_1.default.createElement("div", { className: "bg-gray-800 p-3 rounded" },
                react_1.default.createElement("h3", { className: "text-lg font-semibold mb-2" }, "Smallest Transaction"),
                react_1.default.createElement("p", { className: "text-2xl" },
                    transactionData.smallestTransaction,
                    " TON")),
            react_1.default.createElement("div", { className: "bg-gray-800 p-3 rounded" },
                react_1.default.createElement("h3", { className: "text-lg font-semibold mb-2" }, "Total Fees"),
                react_1.default.createElement("p", { className: "text-2xl" },
                    transactionData.totalFees,
                    " TON"))),
        react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
            react_1.default.createElement("div", null,
                react_1.default.createElement("h3", { className: "text-lg font-semibold mb-2" }, "Monthly Transaction Volume"),
                react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: 300 },
                    react_1.default.createElement(recharts_1.BarChart, { data: transactionData.volumeData },
                        react_1.default.createElement(recharts_1.XAxis, { dataKey: "date" }),
                        react_1.default.createElement(recharts_1.YAxis, null),
                        react_1.default.createElement(recharts_1.Tooltip, null),
                        react_1.default.createElement(recharts_1.Legend, null),
                        react_1.default.createElement(recharts_1.Bar, { dataKey: "volume", fill: "#8884d8" })))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("h3", { className: "text-lg font-semibold mb-2" }, "Transaction Types"),
                react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: 300 },
                    react_1.default.createElement(recharts_1.PieChart, null,
                        react_1.default.createElement(recharts_1.Pie, { data: transactionData.typeData, cx: "50%", cy: "50%", labelLine: false, outerRadius: 80, fill: "#8884d8", dataKey: "count" }, transactionData.typeData.map((_, index) => (react_1.default.createElement(recharts_1.Cell, { key: `cell-${index}`, fill: COLORS[index % COLORS.length] })))),
                        react_1.default.createElement(recharts_1.Tooltip, null),
                        react_1.default.createElement(recharts_1.Legend, null)))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("h3", { className: "text-lg font-semibold mb-2" }, "Daily Transaction Activity"),
                react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: 300 },
                    react_1.default.createElement(recharts_1.LineChart, { data: transactionData.activityData },
                        react_1.default.createElement(recharts_1.XAxis, { dataKey: "date" }),
                        react_1.default.createElement(recharts_1.YAxis, null),
                        react_1.default.createElement(recharts_1.Tooltip, null),
                        react_1.default.createElement(recharts_1.Legend, null),
                        react_1.default.createElement(recharts_1.Line, { type: "monotone", dataKey: "count", stroke: "#8884d8" })))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("h3", { className: "text-lg font-semibold mb-2" }, "Hourly Transaction Distribution"),
                react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: 300 },
                    react_1.default.createElement(recharts_1.AreaChart, { data: transactionData.hourlyData },
                        react_1.default.createElement(recharts_1.XAxis, { dataKey: "hour" }),
                        react_1.default.createElement(recharts_1.YAxis, null),
                        react_1.default.createElement(recharts_1.Tooltip, null),
                        react_1.default.createElement(recharts_1.Legend, null),
                        react_1.default.createElement(recharts_1.Area, { type: "monotone", dataKey: "count", stroke: "#82ca9d", fill: "#82ca9d" })))))));
};
exports.default = AnalyticsReport;
//# sourceMappingURL=AnalyticsReport.js.map