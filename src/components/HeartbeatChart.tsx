// src/components/HeartbeatChart.tsx

import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import '/styles/HeartbeatChart.css';import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import Chart from 'chart.js/auto';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip
);

// Define the props interface
interface HeartbeatChartProps {
  priceFeed: number[]; // Array of price data
}

const HeartbeatChart: React.FC<HeartbeatChartProps> = ({ priceFeed }) => {
  const chartRef = useRef<ChartJS<'line'> | null>(null);

  // Prepare the data
  const data = {
    labels: priceFeed.map((_, index) => index),
    datasets: [
      {
        label: 'Price',
        data: priceFeed,
        borderColor: '#00FF00', // Bright green color
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        borderWidth: 2,
        pointRadius: 0, // Remove points
        tension: 0.4, // Smooth curves
      },
    ],
  };

  // Chart options to mimic heartbeat monitor
  const options = {
    responsive: true,
    animation: {
      duration: 0, // Disable animation for real-time updates
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        display: false, // Hide X axis
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear' as const,
        display: false, // Hide Y axis
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="chartContainer">
      <Line
        data={data}
        options={options}
      />
    </div>
  );
};export default HeartbeatChart;
