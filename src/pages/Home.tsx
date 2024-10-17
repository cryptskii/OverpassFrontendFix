import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Overpass</h1>
      <p className="text-xl mb-8">A decentralized platform for seamless TON transactions</p>
      <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Get Started
      </Link>
    </div>
  )
}

export default Home
