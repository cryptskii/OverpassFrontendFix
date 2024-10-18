import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import './styles/globals.css'
import './styles/PipBoyWalletDashboard.css' 
import App from './App' 

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TonConnectUIProvider>
        <App />
      </TonConnectUIProvider>
    </BrowserRouter>
  </React.StrictMode>
)