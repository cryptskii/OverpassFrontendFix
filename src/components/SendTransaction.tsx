import React, { useState } from 'react'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { useTonAccess } from './TonAccessProvider'
import TonWeb from 'tonweb'

interface SendTransactionProps {
  onSend?: () => void
}

const SendTransaction: React.FC<SendTransactionProps> = ({ onSend }) => {
  const [tonConnectUI] = useTonConnectUI()
  const { tonweb } = useTonAccess()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null)

  const validateInputs = (): boolean => {
    if (!recipient) {
      setError('Please enter a recipient address')
      return false
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return false
    }
    return true
  }

  const handleConfirm = () => {
    if (validateInputs()) {
      setIsConfirming(true)
      setError(null)
    }
  }

  const handleCancel = () => {
    setIsConfirming(false)
    setError(null)
  }

  const handleSend = async () => {
    if (!tonConnectUI.connected || !tonweb) {
      setError('Please connect your wallet first')
      return
    }

    try {
      setTransactionStatus('Preparing transaction...')
      const amountNano = TonWeb.utils.toNano(amount)
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60 * 20, // Valid for 20 minutes
        messages: [
          {
            address: recipient,
            amount: amountNano.toString(),
          },
        ],
      }

      setTransactionStatus('Sending transaction...')
      const result = await tonConnectUI.sendTransaction(transaction)
      setSuccess(`Transaction sent successfully. Hash: ${result.boc}`)
      setTransactionStatus('Transaction completed')
      setError(null)
      setIsConfirming(false)
      setRecipient('')
      setAmount('')
      if (onSend) {
        onSend()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? `Failed to send transaction: ${err.message}` : `Failed to send transaction: ${String(err)}`
      setError(errorMessage)
      setTransactionStatus(null)
      setSuccess(null)
    }
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Send Transaction</h2>
      {!isConfirming ? (
        <>
          <div className="mb-4">
            <label htmlFor="recipient" className="block mb-2">Recipient Address</label>
            <input
              id="recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2">Amount (TON)</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded"
            />
          </div>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Confirm Transaction
          </button>
        </>
      ) : (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Confirm Transaction</h3>
          <p>Recipient: {recipient}</p>
          <p>Amount: {amount} TON</p>
          <div className="mt-4">
            <button
              onClick={handleSend}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Send
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
      {transactionStatus && <p className="text-blue-500 mt-2">{transactionStatus}</p>}
    </div>
  )
}

export default SendTransaction
