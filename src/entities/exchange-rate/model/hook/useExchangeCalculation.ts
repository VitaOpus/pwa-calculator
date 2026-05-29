import { useCallback, useState } from 'react';

import type { ExchangeResponseV1 } from '@/shared/api';

import type { ExchangeRateContextValue } from './ExchangeCalculationContext';
import { useCalculateLocalMutation } from './useCalculateLocalMutation';
import { useCurrencyRates } from './useCurrencyRates';
import { useExchangeMutation } from './useExchangeMutation';

export const useExchangeCalculation = (): ExchangeRateContextValue => {
  const { data: currencyRates } = useCurrencyRates();
  const { mutate: exchangeMutate, isPending: exchangePending } = useExchangeMutation();
  const { mutate: calculateMutate, isPending: calculatePending } = useCalculateLocalMutation();
  const [exchangeResult, setExchangeResult] = useState<ExchangeResponseV1 | null>(null);

  const onStepsChange = useCallback(
    (steps: string[], amount: string) => {
      if (steps.length > 1 && currencyRates) {
        calculateMutate(
          { amount, steps, rates: currencyRates },
          { onSuccess: (data) => setExchangeResult(data) },
        );
      } else {
        setExchangeResult(null);
      }
    },
    [calculateMutate, currencyRates],
  );

  const onAmountChange = useCallback(
    (amount: string, steps: string[]) => {
      if (steps.length > 1 && Number(amount) > 0) {
        exchangeMutate({ steps, amount }, { onSuccess: (data) => setExchangeResult(data) });
      }
    },
    [exchangeMutate],
  );

  return {
    exchangeResult,
    isPending: exchangePending || calculatePending,
    onStepsChange,
    onAmountChange,
  };
};
