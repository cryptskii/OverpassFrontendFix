import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import './App'
import './styles/globals.css'
import './styles/PipBoyWalletDashboard.css' 
import { App }  from './App'


export const root = createRoot(document.getElementById('app')!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TonConnectUIProvider>
        < App />
      </TonConnectUIProvider>
    </BrowserRouter>
  </React.StrictMode>
)
