import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { useTonWallet } from '../hooks/useTonWallet';
import { fetchTransactions } from '../utils/api';

const AnalyticsReport: React.FC = () => {
  const { address } = useTonWallet();
  const [transactionData, setTransactionData] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadTransactions = async () => {
      if (address) {
        try {
          setLoading(true);
          const txs = await fetchTransactions(address, false); // Assuming mainnet by default
          processTransactionData(txs);
          setLoading(false);
        } catch (err) {
          setError('Failed to load transaction data. Please try again later.');
          setLoading(false);
        }
      }
    };
    loadTransactions();
  }, [address]);

  const processTransactionData = (transactions: any[]) => {
    const monthlyVolume: { [key: string]: number } = {};
    const transactionTypes: { [key: string]: number } = { send: 0, receive: 0 };
    const dailyTransactionCount: { [key: string]: number } = {};
    const hourlyDistribution: { [key: string]: number } = {};
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
    return <p>Loading analytics...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transaction Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-800 p-3 rounded">
          <h3 className="text-lg font-semibold mb-2">Total Transactions</h3>
          <p className="text-2xl">{transactionData.totalTransactions}</p>
        </div>
        <div className="bg-gray-800 p-3 rounded">
          <h3 className="text-lg font-semibold mb-2">Total Volume</h3>
          <p className="text-2xl">{transactionData.totalVolume} TON</p>
        </div>
        <div className="bg-gray-800 p-3 rounded">
          <h3 className="text-lg font-semibold mb-2">Average Transaction Size</h3>
          <p className="text-2xl">{transactionData.averageTransactionSize} TON</p>
        </div>
        <div className="bg-gray-800 p-3 rounded">
          <h3 className="text-lg font-semibold mb-2">Largest Transaction</h3>
          <p className="text-2xl">{transactionData.largestTransaction} TON</p>
        </div>
        <div className="bg-gray-800 p-3 rounded">
          <h3 className="text-lg font-semibold mb-2">Smallest Transaction</h3>
          <p className="text-2xl">{transactionData.smallestTransaction} TON</p>
        </div>
        <div className="bg-gray-800 p-3 rounded">
          <h3 className="text-lg font-semibold mb-2">Total Fees</h3>
          <p className="text-2xl">{transactionData.totalFees} TON</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Monthly Transaction Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionData.volumeData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="volume" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Transaction Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={transactionData.typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {transactionData.typeData.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Daily Transaction Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transactionData.activityData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Hourly Transaction Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={transactionData.hourlyData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReport;
