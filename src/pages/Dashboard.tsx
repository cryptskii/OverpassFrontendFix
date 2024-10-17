import React, { useState, useEffect } from 'react'
import Balance from '../components/Balance'
import TransactionList from '../components/TransactionList'
import { useTonWallet } from '../hooks/useTonWallet'
import { fetchTransactions } from '../utils/api'

const Dashboard: React.FC = () => {
  const { address } = useTonWallet()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTransactions = async () => {
      if (address) {
        try {
          const txs = await fetchTransactions(address)
          setTransactions(txs)
          setLoading(false)
        } catch (err) {
          setError('Failed to load transactions. Please try again later.')
          setLoading(false)
        }
      }
    }

    loadTransactions()
  }, [address])

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
        {loading ? (
          <p>Loading transactions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </div>
    </div>
  )
}

export default Dashboard
