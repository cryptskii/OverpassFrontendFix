import React from 'react'
import Balance from '../components/Balance'
import SendTransaction from '../components/SendTransaction'
import TransactionHistory from '../components/TransactionHistory'
import { useTonWallet } from '../hooks/useTonWallet'

const Dashboard: React.FC = () => {
  const { address } = useTonWallet()

  if (!address) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Please connect your wallet to view your dashboard.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Balance />
        <SendTransaction />
        <TransactionHistory />
      </div>
    </div>
  )
}

export default Dashboard
