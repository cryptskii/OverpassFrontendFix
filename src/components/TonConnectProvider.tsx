import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

export const TonConnectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <TonConnectUIProvider manifestUrl="https://<YOUR_APP_URL>/tonconnect-manifest.json">
            {children}
        </TonConnectUIProvider>
    );
};
