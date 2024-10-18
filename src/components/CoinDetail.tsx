// src/components/CoinDetail.tsx

import React from 'react';
import { useCoinData } from '../hooks/useCoinData';
import '../styles/CoinDetail.css';

interface CoinDetailProps {
  coinId: string;
}

const CoinDetail: React.FC<CoinDetailProps> = ({ coinId }) => {
  const { coinData, loading, error } = useCoinData(coinId);

  if (loading) {
    return <div className="loading">Loading {coinId} data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="coinDetailContainer">
      <h2>{coinData?.name} ({coinData?.symbol})</h2>
      <p>Rank: {coinData?.rank}</p>
      <p>Type: {coinData?.type}</p>
      <p>{coinData?.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};
export default CoinDetail;
