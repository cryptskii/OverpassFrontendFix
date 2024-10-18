import { TonConnectUIProvider } from '@tonconnect/ui-react';

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
        <TonConnectButton />
      </header>
    );
  };