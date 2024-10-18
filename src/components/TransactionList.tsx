// src/components/TransactionList.tsx

import React from 'react';

interface Token {
  name: string;
  symbol: string;
  balance: string;
}

interface TokenListProps {
  tokens: Token[];
}

const TokenList: React.FC<TokenListProps> = ({ tokens }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tokens</h2>
      <ul className="space-y-2">
        {tokens.map((token, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="text-lg font-semibold">{token.name}</span>
            <span className="text-sm text-gray-400">{token.symbol}</span>
            <span className="text-lg font-semibold">{token.balance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenList; // Default export
