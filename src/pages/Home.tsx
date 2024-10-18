// src/pages/Home.tsx

import React from 'react';
import Livepricefeeds from '../components/Livepricefeeds';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className='home'>
      {/* Scanline Overlay */}
      <div className="scanline"></div>

      <h1 className='title'>Welcome to Overpass Wallet</h1>
      <p className='description'>
        Your gateway to managing TON transactions seamlessly. With Overpass Wallet, you can easily send, receive, and store your TON tokens securely. Our intuitive interface and powerful features make it simple to take control of your digital assets.
      </p>
      <div className='priceCharts'>
        <Livepricefeeds />
      </div>
      <div className='features'>
        <div className='feature'>
          <h3>Secure Storage</h3>
          <p>Keep your TON tokens safe with our state-of-the-art security measures.</p>
        </div>
        <div className='feature'>
          <h3>Easy Transactions</h3>
          <p>Send and receive TON tokens with just a few clicks.</p>
        </div>
        <div className='feature'>
          <h3>Intuitive Interface</h3>
          <p>Manage your digital assets effortlessly with our user-friendly interface.</p>
        </div>
      </div>
      <button className='cta' aria-label="Get Started with Overpass Wallet">Get Started</button>
    </div>
  );
};

export default Home;