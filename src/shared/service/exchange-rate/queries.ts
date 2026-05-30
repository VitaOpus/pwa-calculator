import { useMutation, useQuery } from '@tanstack/react-query';

import { exchangeCurrency, getCurrencyRates } from '@/shared/api';

import { CALCULATION_SOURCE } from './config';

import { createContext, useContext } from 'react';

export interface ExchangeRateContextValue {
  isPending: boolean;
  onStepsChange: (steps: string[], amount: string) => void;
  onAmountChange: (amount: string, steps: string[]) => void;
}

export const ExchangeRateContext = createContext<ExchangeRateContextValue>({
  isPending: false,
  onStepsChange: () => {},
  onAmountChange: () => {},
});

export const useExchangeRateContext = () => useContext(ExchangeRateContext);

export const useCurrencyRates = () =>
  useQuery({
    queryKey: ['currency-rates'],
    queryFn: getCurrencyRates,
    staleTime: 60 * 60_000,
    enabled: CALCULATION_SOURCE === 'local',
  });

export const useExchangeMutation = () =>
  useMutation({
    mutationFn: exchangeCurrency,
  });
