// src/components/Livepricefeeds.tsx

import React, { useEffect, useState } from "react";
import { usePriceFeedsRealtime } from "../hooks/getPriceFeedsRealtime";
import HeartbeatChart from "./HeartbeatChart";
import SevenSegmentDisplay from "./SevenSegmentDisplay";
import "../styles/Livepricefeeds.css";

const Livepricefeeds: React.FC = () => {
  const { priceFeeds, error } = usePriceFeedsRealtime();
  
  // Initialize state for multiple coins
  const [priceHistories, setPriceHistories] = useState<{ [key: string]: number[] }>({});
  const [currentPrices, setCurrentPrices] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (priceFeeds.length > 0) {
      const updatedPriceHistories: { [key: string]: number[] } = {};
      const updatedCurrentPrices: { [key: string]: string } = {};

      priceFeeds.forEach((feed) => {
        // Update price history (keep last 50 data points)
        updatedPriceHistories[feed.name] = [
          ...(priceHistories[feed.name] || []).slice(-49),
          feed.price,
        ];

        // Update current price
        updatedCurrentPrices[feed.name] = `${feed.price.toFixed(2)}`;
      });

      setPriceHistories(updatedPriceHistories);
      setCurrentPrices(updatedCurrentPrices);
      setIsLoading(false);

      // Optional: Console logs for debugging
      console.log("Updated Price Histories:", updatedPriceHistories);
      console.log("Updated Current Prices:", updatedCurrentPrices);
    }
  }, [priceFeeds]);

  if (error) {
    return (
      <div className='error'>
        <p>Oops! Something went wrong while fetching the price feeds.</p>
        <p>Error: {error.message}</p>
        <button className='retryButton' onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div className='loading'>Loading live price feeds...</div>;
  }

  return (
    <div className='livePriceFeeds'>
      <h2>Live Price Feeds</h2>
      <div className='priceFeedList'>
        {priceFeeds.map((feed) => (
          <div key={feed.name} className='priceFeedItem'>
            <h3>{feed.name}</h3>
            <HeartbeatChart priceFeed={priceHistories[feed.name] || []} />
            <SevenSegmentDisplay value={currentPrices[feed.name] || "$0.00"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Livepricefeeds;
