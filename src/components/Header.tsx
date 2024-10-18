// src/components/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import WalletConnect from './WalletConnect';

const Header: React.FC = () => {
  return (
    <header className="pip-boy-header flex justify-between items-center p-4 bg-gray-80 text-white">
      <img src={"./assets/4.png"} alt="logo" className="op-logo flex justify-center items-center"></img>
      <h1 className="text-2xl font-bold">Overpass Network</h1>
      <nav className="pip-boy-nav space-x-4">
        <Link to="/" className="pip-boy-button hover:text-gray-400">Home</Link>
        <Link to="/about" className="pip-boy-button hover:text-gray-400">About</Link>
        <Link to="/dashboard" className="pip-boy-button hover:text-gray-400">Dashboard</Link>
      </nav>
      <WalletConnect />
    </header>
  );
};

export default Header;
