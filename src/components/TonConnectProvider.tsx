import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

export const TonConnectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <TonConnectUIProvider manifestUrl="https://overpass-frontend-den9pqd7n-brandons-projects-d6012021.vercel.app/tonconnect-manifest.json">
            {children}
        </TonConnectUIProvider>
    );
};
