import { getTonapi, setTonapiClient, useTonClient } from '@/store/tonClient'
import { useEffect } from 'react'
import { TonClient } from '@ton/ton'
import useLocalStorage from 'react-use-localstorage'
import { getHttpEndpoint } from '@orbs-network/ton-access'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export async function fetchTransactions(address: string, isTestnet: boolean) {
  const tonapi = getTonapi(isTestnet)
  const transactions = await tonapi.fetchTransactions(address)
  return transactions
}
export function ApiSettings() {
  const [isTestnet, setTestnet] = useLocalStorage('deployerIsTestnet', 'false')
  const tonClient = useTonClient()

  useEffect(() => {
    console.log('change network')
    getHttpEndpoint({
      network: isTestnet === 'true' ? 'testnet' : 'mainnet',
    }).then((endpoint) => {
      tonClient.set(
        new TonClient({
          endpoint,
        })
      )
    })

    setTonapiClient(getTonapi(isTestnet === 'true'))
  }, [isTestnet])

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="apiTestnetInput"
        checked={isTestnet === 'true'}
        onCheckedChange={(checked) => setTestnet(String(checked))}
      />
      <Label htmlFor="apiTestnetInput">Use Testnet</Label>
    </div>
  )
}


