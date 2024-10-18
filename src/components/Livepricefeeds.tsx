// ./src/components/Livepricefeeds.tsx
import React from "react";
import { usePriceFeedsRealtime } from "../hooks/getPriceFeedsRealtime";

const Livepricefeeds: React.FC = () => {
  const { priceFeeds, error } = usePriceFeedsRealtime();

  if (error) {
    return <div>Error fetching price feeds: {error.message}</div>;
  }

  return (
    <div className="live-price-feeds">
      <h2>Live Price Feeds</h2>
      {priceFeeds.map((feed) => (
        <div key={feed.name} className="price-feed">
          <h3>{feed.name}</h3>
          <p>{feed.price !== null ? `$${feed.price.toFixed(2)}` : "Loading..."}</p>
        </div>
      ))}
    </div>
  );
};

export default Livepricefeeds;