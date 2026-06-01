import { useCallback } from 'react';

import { serviceExchangeRate } from '@/shared/service';
import { useExchangeStore } from '../store';

export const useExchangeCalculation = (): serviceExchangeRate.ExchangeRateContextValue => {
  const { data: currencyRates } = serviceExchangeRate.useCurrencyRates();
  const { mutate: exchangeMutate } = serviceExchangeRate.useExchangeMutation();
  const { isPending, setExchangeResult, setIsPending, setError } = useExchangeStore();

  const calculate = useCallback(
    (steps: string[], amount: string) => {
      if (serviceExchangeRate.CALCULATION_SOURCE === 'server') {
        setIsPending(true);
        setError(null);
        exchangeMutate(
          { steps, amount },
          {
            onSuccess: (data) => {
              setExchangeResult(data);
              setIsPending(false);
            },
            onError: (err) => {
              setError(err instanceof Error ? err : new Error(String(err)));
              setIsPending(false);
            },
          },
        );
      } else if (currencyRates) {
        setIsPending(true);
        setError(null);
        serviceExchangeRate.calculateLocal({ amount, steps, rates: currencyRates }).then((data) => {
          setExchangeResult(data);
          setIsPending(false);
        });
      }
    },
    [currencyRates, exchangeMutate, setError, setExchangeResult, setIsPending],
  );

  const onStepsChange = useCallback(
    (steps: string[], amount: string) => {
      if (steps.length > 1) {
        calculate(steps, amount);
      } else {
        setExchangeResult(null);
      }
    },
    [calculate, setExchangeResult],
  );

  const onAmountChange = useCallback(
    (amount: string, steps: string[]) => {
      if (steps.length > 1 && Number(amount) > 0) {
        calculate(steps, amount);
      }
    },
    [calculate],
  );

  return {
    isPending,
    onStepsChange,
    onAmountChange,
  };
};
