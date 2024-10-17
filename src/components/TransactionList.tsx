import React from 'react'

interface Transaction {
  id: string
  amount: number
  type: 'send' | 'receive'
  address: string
  timestamp: number
}

interface TransactionListProps {
  transactions: Transaction[]
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li key={tx.id} className="flex justify-between items-center">
            <span className={tx.type === 'receive' ? 'text-green-400' : 'text-red-400'}>
              {tx.type === 'receive' ? '+' : '-'}{tx.amount} TON
            </span>
            <span className="text-sm text-gray-400">{new Date(tx.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList
