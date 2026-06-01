import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';

import { exchangeCurrency, getCurrencyRates } from '@/shared/api';

import { CALCULATION_SOURCE } from './config';

import { createContext, useContext } from 'react';

export interface ExchangeRateContextValue {
  isPending: boolean;
  onStepsChange: (steps: string[], amount: string) => void;
  onAmountChange: (amount: string, steps: string[]) => void;
}

export const ExchangeRateContext = createContext<ExchangeRateContextValue | null>(null);

export const useExchangeRateContext = () => {
  const ctx = useContext(ExchangeRateContext);
  if (!ctx) {
    throw new Error('useExchangeRateContext must be used within ExchangeRateContext.Provider');
  }

  return ctx;
};

export const currencyRatesQueryOptions = queryOptions({
  queryKey: ['currency-rates'],
  queryFn: getCurrencyRates,
  staleTime: 5 * 60_000, // На сервере TTL 1ч
  enabled: CALCULATION_SOURCE === 'local',
});

export const useCurrencyRates = () => useQuery(currencyRatesQueryOptions);

export const useExchangeMutation = () =>
  useMutation({
    mutationFn: exchangeCurrency,
  });
