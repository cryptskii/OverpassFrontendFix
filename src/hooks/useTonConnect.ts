import { useState, useCallback } from 'react'
import { useTonConnectUI, TonConnectUI } from '@tonconnect/ui-react'
import { WalletInfo, SendTransactionRequest } from '@tonconnect/sdk'

type ExtendedWalletInfo = WalletInfo & {
  balance?: string
  icon: string
  address: string
}

export function useTonConnect() {
  const [walletInfo, setWalletInfo] = useState<ExtendedWalletInfo | null>(null)
  const [channelAddress] = useState<string | null>(null)
  const [channelState] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [tonConnectUI] = useTonConnectUI()

  const getWalletInfo = useCallback(
    async (instance: TonConnectUI): Promise<ExtendedWalletInfo | null> => {
      const wallets = await instance.getWallets()
      if (!wallets || wallets.length === 0) return null
      const wallet = wallets[0] as WalletInfo & { address: string }
      const balance = (await (instance as any).getBalance?.(wallet.address)) || '0'
      return { ...wallet, balance, icon: wallet.imageUrl, address: wallet.address }
    },
    []
  )

  const handleConnect = useCallback(async () => {
    if (!tonConnectUI) return
    try {
      setIsLoading(true)
      await tonConnectUI.connectWallet()
      const newWalletInfo = await getWalletInfo(tonConnectUI)
      setWalletInfo(newWalletInfo)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
    } finally {
      setIsLoading(false)
    }
  }, [tonConnectUI, getWalletInfo])

  const handleDisconnect = useCallback(async () => {
    if (!tonConnectUI) return
    try {
      setIsLoading(true)
      await tonConnectUI.disconnect()
      setWalletInfo(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect wallet')
    } finally {
      setIsLoading(false)
    }
  }, [tonConnectUI])

  const handleOpenModal = useCallback(async () => {
    if (!tonConnectUI) return
    try {
      setIsLoading(true)
      await tonConnectUI.openModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open modal')
    } finally {
      setIsLoading(false)
    }
  }, [tonConnectUI])

  const handleCloseModal = useCallback(async () => {
    if (!tonConnectUI) return
    try {
      setIsLoading(true)
      tonConnectUI.closeModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to close modal')
    } finally {
      setIsLoading(false)
    }
  }, [tonConnectUI])


  return {
    tonConnectUI,
    walletInfo,
    channelAddress,
    channelState,
    isLoading,
    error,
    handleConnect,
    handleDisconnect,
    handleOpenModal,
    handleCloseModal,
  
  }
}
