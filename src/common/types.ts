// src/types.ts

export interface Transaction {
    timestamp: string | number | Date;
    id: string;
    amount: number;
    date: string;
    sender: string;
    recipient: string;
    status: 'pending' | 'completed' | 'failed';
    type: 'incoming' | 'outgoing';
    description?: string;
  }
  