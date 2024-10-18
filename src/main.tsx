import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import './App'
import './styles/globals.css'
import './styles/PipBoyWalletDashboard.css' 
import Dashboard from './pages/Dashboard'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </TonConnectUIProvider>
  </React.StrictMode>,
)
