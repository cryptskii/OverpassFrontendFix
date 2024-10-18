// src/pages/Home.tsx

import React from 'react';
import Livepricefeeds from '../components/Livepricefeeds';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1 className="home__title">Welcome to Overpass Wallet</h1>
      <p className="home__description">
        Your gateway to managing TON transactions seamlessly. With Overpass Wallet, you can easily send, receive, and store your TON tokens securely. Our intuitive interface and powerful features make it simple to take control of your digital assets.
      </p>
      <div className="home__price-charts">
        <Livepricefeeds />
      </div>
      <div className="home__features">
        <div className="home__feature">
          <h3>Secure Storage</h3>
          <p>Keep your TON tokens safe with our state-of-the-art security measures.</p>
        </div>
        <div className="home__feature">
          <h3>Easy Transactions</h3>
          <p>Send and receive TON tokens with just a few clicks.</p>
        </div>
        <div className="home__feature">
          <h3>Intuitive Interface</h3>
          <p>Manage your digital assets effortlessly with our user-friendly interface.</p>
        </div>
      </div>
      <button className="home__cta">Get Started</button>
    </div>
  );
};

export default Home;