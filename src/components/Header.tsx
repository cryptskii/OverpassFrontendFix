import React from 'react'
import { Link } from 'react-router-dom'
import WalletConnect from './WalletConnect'

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Overpass</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
            <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
          </ul>
        </nav>
        <WalletConnect />
      </div>
    </header>
  )
}

export default Header
