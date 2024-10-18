// src/components/GlobalMarketData.tsx

import React from 'react';
import { useGlobalData } from '../hooks/useGlobalData';
import '../styles/GlobalMarketData.css';

const GlobalMarketData: React.FC = () => {
  const { globalData, loading, error } = useGlobalData();

  if (loading) {
    return <div className='loading'>Loading global market data...</div>;
  }

  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  return (
    <div className='globalDataContainer'>
      <h2>Global Market Data</h2>
      <ul>
        <li>Market Cap (USD): ${globalData?.market_cap_usd?.toLocaleString()}</li>
        <li>24h Volume (USD): ${globalData?.volume_24h_usd?.toLocaleString()}</li>
        <li>Bitcoin Dominance: {globalData?.bitcoin_dominance_percentage}%</li>
        <li>Total Cryptocurrencies: {globalData?.cryptocurrencies_number}</li>
        <li>Market Cap All-Time High: ${globalData?.market_cap_ath_value?.toLocaleString()} on {globalData?.market_cap_ath_date ? new Date(globalData.market_cap_ath_date).toLocaleDateString() : 'N/A'}</li>
        <li>24h Change Market Cap: {globalData?.market_cap_change_24h}%</li>
        <li>24h Change Volume: {globalData?.volume_24h_change_24h}%</li>
        <li>Last Updated: {globalData?.last_updated ? new Date(globalData.last_updated * 1000).toLocaleString() : 'N/A'}</li>
      </ul>
    </div>
  );
};

export default GlobalMarketData;
