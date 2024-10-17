import React, { createContext, useContext, useEffect, useState } from 'react';
import TonWeb from 'tonweb';
import TonAccess from '@orbs-network/ton-access';

interface TonAccessContextType {
  tonweb: TonWeb | null;
}

const TonAccessContext = createContext<TonAccessContextType>({ tonweb: null });

export const useTonAccess = () => useContext(TonAccessContext);

export const TonAccessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tonweb, setTonweb] = useState<TonWeb | null>(null);

  useEffect(() => {
    const initializeTonAccess = async () => {
      try {
        const endpoint = await TonAccess.getHttpEndpoint({ network: 'testnet' });
        const newTonweb = new TonWeb(new TonWeb.HttpProvider(endpoint));
        setTonweb(newTonweb);
        console.log('TonAccess initialized successfully');
      } catch (error) {
        console.error('Failed to initialize TonAccess:', error);
      }
    };

    initializeTonAccess();
  }, []);

  return (
    <TonAccessContext.Provider value={{ tonweb }}>
      {children}
    </TonAccessContext.Provider>
  );
};
