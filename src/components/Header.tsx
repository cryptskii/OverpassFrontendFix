import React from 'react'
import { Link } from 'react-router-dom'
import WalletConnect from './WalletConnect'

const Header: React.FC = () => {
  return (
    <header className="pip-boy-header">
      <h1>Overpass</h1>
      <nav className="pip-boy-nav">
        <Link to="/" className="pip-boy-button">Home</Link>
        <Link to="/about" className="pip-boy-button">About</Link>
        <Link to="/dashboard" className="pip-boy-button">Dashboard</Link>
      </nav>
      <WalletConnect />
    </header>
  )
}

export default Header
