import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import './styles/globals.css'
import './styles/PipBoyWalletDashboard.css' 
import { OpApp } from './App'  // Import OpApp instead of App

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TonConnectUIProvider>
        <OpApp />
      </TonConnectUIProvider>
    </BrowserRouter>
  </React.StrictMode>
)