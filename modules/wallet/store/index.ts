import { create } from 'zustand';
import createSelectors from '@/utils/selectors';
import { mockWalletData, Transaction as MockTransaction } from '../constants/mockData';

// Types
type Transaction = {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: string;
  name: string;
  time: string;
};

type WalletState = {
  balance: number;
  securityDeposit: number;
  transactions: Transaction[];
};

type WalletActions = {
  updateBalance: (amount: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addFunds: (amount: number, paymentMethod: string) => void;
  resetWallet: () => void;
};

// Map mock transactions to our store format
const mapMockTransactions = (mockTransactions: MockTransaction[]): Transaction[] => {
  return mockTransactions.map(t => ({
    id: t.id,
    amount: t.amount,
    type: t.type,
    description: t.description || '',
    date: t.date,
    name: t.name,
    time: t.time
  }));
};

// Initial state from mock data
const initialState: WalletState = {
  balance: mockWalletData.currentBalance,
  securityDeposit: mockWalletData.securityDeposit,
  transactions: mapMockTransactions(mockWalletData.transactions),
};

// Create store
const walletStore = create<WalletState & WalletActions>((set) => ({
  ...initialState,

  // Update wallet balance
  updateBalance: (amount) => 
    set((state) => ({ 
      balance: state.balance + amount 
    })),

  // Add new transaction
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        {
          ...transaction,
          id: Date.now().toString(),
        },
        ...state.transactions,
      ],
    })),

  // Add funds to wallet
  addFunds: (amount) =>
    set((state) => ({
      balance: state.balance + amount,
      transactions: [
        {
          id: Date.now().toString(),
          amount: amount,
          type: 'credit',
          description: 'Wallet recharge',
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
          name: `Christ University`,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
        ...state.transactions,
      ],
    })),

  // Reset wallet to initial state
  resetWallet: () => set(initialState),
}));

// Create and export selectors
export default createSelectors(walletStore);