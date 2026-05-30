import { create } from 'zustand';

import type { ExchangeResponseV1 } from '@/shared/api';

interface ExchangeStore {
  exchangeResult: ExchangeResponseV1 | null;
  isPending: boolean;
  error: Error | null;
  setExchangeResult: (result: ExchangeResponseV1 | null) => void;
  setIsPending: (isPending: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useExchangeStore = create<ExchangeStore>((set) => ({
  exchangeResult: null,
  isPending: false,
  error: null,
  setExchangeResult: (exchangeResult) => set({ exchangeResult }),
  setIsPending: (isPending) => set({ isPending }),
  setError: (error) => set({ error }),
}));
