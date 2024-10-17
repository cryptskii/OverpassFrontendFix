

} catch (err) {
        const errorMessage = err instanceof Error ? `Failed to send transaction: ${err.message}` : `Failed to send transaction: ${String(err)}`;
        setError(errorMessage);
        setSuccess(null);
      }

  const handleSend = async () => {
    if (!tonConnectUI.connected || !tonweb) {
      setError('Please connect your wallet first')
      return
    }

    try {
      const amountNano = TonWeb.utils.toNano(amount)
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60 * 20, // Valid for 20 minutes
        messages: [
          {
            address: recipient,
            amount: amountNano,
          },
        ],
      }

      try {
         const result = await tonConnectUI.sendTransaction(transaction);
         setSuccess(`Transaction sent successfully. Hash: ${result.boc}`);
         setError(null);
      } catch (err) {
         if (err instanceof Error) {
            setError(`Failed to send transaction: ${err.message}`);
         } else {
            setError(`Failed to send transaction: ${String(err)}`);
         }
         setSuccess(null);
      }

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Send Transaction</h2>
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
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Send
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  )
}

export default SendTransaction
