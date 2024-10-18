// src/components/Livepricefeeds.tsx

import React, { useEffect, useState } from "react";
import { usePriceFeedsRealtime } from "../hooks/getPriceFeedsRealtime";
import HeartbeatChart from "./HeartbeatChart";
import SevenSegmentDisplay from "./SevenSegmentDisplay";
import "../styles/Livepricefeeds.css";

const Livepricefeeds: React.FC = () => {
  const { priceFeeds, error } = usePriceFeedsRealtime();
  const [tonPriceHistory, setTonPriceHistory] = useState<number[]>([]);
  const [currentTonPrice, setCurrentTonPrice] = useState<string>("0.00");

  useEffect(() => {
    // Filter TON price from priceFeeds
    const tonFeed = priceFeeds.find((feed) => feed.name.toLowerCase() === "ton");
    if (tonFeed) {
      setTonPriceHistory((prev) => [...prev.slice(-49), tonFeed.price]); // Keep last 50 data points
      setCurrentTonPrice(tonFeed.price.toFixed(2));
    }
  }, [priceFeeds]);

  if (error) {
    return <div className='error'>Error fetching price feeds: {error.message}</div>;
  }

  return (
    <div className='livePriceFeeds'>
      <h2>Live TON Price</h2>
      <HeartbeatChart priceFeed={tonPriceHistory} />
      <SevenSegmentDisplay value={`$${currentTonPrice}`} />
    </div>
  );
};

export default Livepricefeeds;
