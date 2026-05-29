import { ChangeEvent, useTransition } from 'react';

import type { SelectValueChangeDetails } from '@chakra-ui/react';
import { useField } from '@tanstack/react-form';

import { useAppFormContext, useExchangeRateContext } from '@/entities/exchange-rate';
import { useDebounce } from '@/shared/lib';

export const useController = () => {
  const form = useAppFormContext();
  const steps = useField({ form, name: 'steps' });
  const amount = useField({ form, name: 'amount' });
  const [, startTransition] = useTransition();
  const { onAmountChange, onStepsChange } = useExchangeRateContext();

  const debouncedAmountChanged = useDebounce(
    (value: string) =>
      startTransition(() => {
        onAmountChange(value, steps.state.value);
      }),
    300,
  );

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(',', '.');

    const parts = value.split('.');
    if (parts[1]?.length > 2) {
      value = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    if (Number(value) >= 0) {
      amount.handleChange(value);
      debouncedAmountChanged(value);
    }
  };

  const handleCurrencyChange = (index: number) => {
    return (object: SelectValueChangeDetails) => {
      const next = [...steps.state.value];
      next[index] = object.value[0];
      steps.handleChange(next);
      startTransition(() => {
        onStepsChange(next, amount.state.value);
      });
    };
  };

  return {
    isButAdd: steps.state.value.length === 1,
    amount: amount.state.value,
    onAmountChange: handleAmountChange,
    onCurrencyChange: handleCurrencyChange,
  };
};
