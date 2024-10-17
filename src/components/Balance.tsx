import React from 'react'
import { useTonWallet } from '../hooks/useTonWallet'
import { useTonConnectUI } from "@tonconnect/ui-react";

const Balance: React.FC = () => {
  const { balance } = useTonWallet()
  const [tonConnectUI] = useTonConnectUI()

  const handleConnect = async () => {
    await tonConnectUI.connectWallet()
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Balance</h2>
      {balance !== null ? (
        <p className="text-2xl font-bold">{balance} TON</p>
      ) : (
        <button
          onClick={handleConnect}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}

export default Balance