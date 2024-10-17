import React from 'react'
import { useTonWallet } from '../hooks/useTonWallet'

const Balance: React.FC = () => {
  const { balance } = useTonWallet()

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Balance</h2>
      <p className="text-2xl font-bold">{balance} TON</p>
    </div>
  )
}

export default Balance
