import { createContext, useContext } from 'react';

import type { ExchangeResponseV1 } from '@/shared/api';

export interface ExchangeRateContextValue {
  exchangeResult: ExchangeResponseV1 | null;
  isPending: boolean;
  onStepsChange: (steps: string[], amount: string) => void;
  onAmountChange: (amount: string, steps: string[]) => void;
}

export const ExchangeRateContext = createContext<ExchangeRateContextValue>({
  exchangeResult: null,
  isPending: false,
  onStepsChange: () => {},
  onAmountChange: () => {},
});

export const useExchangeRateContext = () => useContext(ExchangeRateContext);
