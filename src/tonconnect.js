import { TonConnectUIProvider } from '@tonconnect/ui-react';

export function App() {
    return (
        <TonConnectUIProvider manifestUrl="https://overpass-frontend-den9pqd7n-brandons-projects-d6012021.vercel.app/tonconnect-manifest.json">
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