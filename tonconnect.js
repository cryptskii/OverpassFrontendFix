import { TonConnectUIProvider } from '@tonconnect/ui-react';

export function App() {
    return (
        <TonConnectUIProvider manifestUrl="https://<YOUR_APP_URL>/tonconnect-manifest.json">
            { /* Your app */ }
        </TonConnectUIProvider>
    );
}

export const Header = () => {
    return (
      <header>
        <span>My App with React UI</span>
        <TonConnectButton />
      </header>
    );
  };