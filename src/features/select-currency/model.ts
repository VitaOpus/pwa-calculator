import { useTransition } from 'react';

import { useField } from '@tanstack/react-form';

import type { SelectValueChangeDetails } from '@chakra-ui/react';

import { useExchangeRateContext } from '@/shared/service/exchange-rate';

import { useAppFormContext, useExchangeStore } from '@/entities/exchange-rate';

export const useController = () => {
  const form = useAppFormContext();
  const steps = useField({ form, name: 'steps' });
  const amount = useField({ form, name: 'amount' });
  const [, startTransition] = useTransition();
  const { onStepsChange } = useExchangeRateContext();
  const exchangeResult = useExchangeStore((s) => s.exchangeResult);
  const currency = useExchangeStore((s) => s.currency);
  const currencyMap = useExchangeStore((s) => s.currencyMap);

  const count = exchangeResult?.steps?.length ?? 0;

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

  const handleDelete = (index: number) => () => {
    const next = steps.state.value.filter((_: string, i: number) => i !== index + 1);
    steps.handleChange(next);
    startTransition(() => {
      onStepsChange(next, amount.state.value);
    });
  };

  const handleSelect = (data: SelectValueChangeDetails) => {
    const next = [...steps.state.value, data.value[0]];
    steps.handleChange(next);
    startTransition(() => {
      onStepsChange(next, amount.state.value);
    });
  };

  return {
    currency,
    currencyMap,
    exchangeRate: exchangeResult,
    count,
    onCurrencyChange: handleCurrencyChange,
    onDelete: handleDelete,
    onSelect: handleSelect,
  };
};
