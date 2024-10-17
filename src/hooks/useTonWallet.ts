import { useTonConnectUI } from '@tonconnect/ui-react'
import { useState, useEffect } from 'react'

export const useTonWallet = () => {
  const [tonConnectUI] = useTonConnectUI()
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string>('0')

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        setAddress(wallet.account.address)
        setBalance(wallet.account.balance.toString())
      } else {
        setAddress(null)
        setBalance('0')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [tonConnectUI])

  return { address, balance }
}
