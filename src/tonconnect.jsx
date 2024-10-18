import { TonConnectUIProvider } from '@tonconnect/ui-react';
import '../styles/globals.css';

export function App() {
    return (
        <TonConnectUIProvider manifestUrl="https://ovp-eight.vercel.app/tonconnect-manifest.json">
            { OverpassFrontendFix.App }
        </TonConnectUIProvider>
    );
}

export const Header = () => {
    return (
      <header>
        <span>Overpass Frontend Fix</span>
        <TonConnectButton className="ton-connect-button" />
      </header>
    );
  };