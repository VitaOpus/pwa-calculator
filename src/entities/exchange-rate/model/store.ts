import { create } from 'zustand';

import type { ExchangeResponseV1 } from '@/shared/api';

import { Currency } from '../config';

type CurrencyItem = (typeof Currency)[0];

const currencyMap = Currency.reduce<Record<string, CurrencyItem>>((acc, cur) => {
  acc[cur.value] = cur;
  return acc;
}, {});

interface ExchangeStore {
  exchangeResult: ExchangeResponseV1 | null;
  isPending: boolean;
  error: Error | null;
  currency: typeof Currency;
  currencyMap: Record<string, CurrencyItem>;
  setExchangeResult: (result: ExchangeResponseV1 | null) => void;
  setIsPending: (isPending: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useExchangeStore = create<ExchangeStore>((set) => ({
  exchangeResult: null,
  isPending: false,
  error: null,
  currency: Currency,
  currencyMap,
  setExchangeResult: (exchangeResult) => set({ exchangeResult }),
  setIsPending: (isPending) => set({ isPending }),
  setError: (error) => set({ error }),
}));
