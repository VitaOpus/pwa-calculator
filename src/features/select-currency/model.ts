import { useTransition } from 'react';

import { useField } from '@tanstack/react-form';

import type { SelectValueChangeDetails } from '@chakra-ui/react';

import {
  configExchangeRate,
  useAppFormContext,
  useExchangeRateContext,
} from '@/entities/exchange-rate';

export const useController = () => {
  const form = useAppFormContext();
  const steps = useField({ form, name: 'steps' });
  const amount = useField({ form, name: 'amount' });
  const [, startTransition] = useTransition();
  const { exchangeResult, onStepsChange } = useExchangeRateContext();

  const count = exchangeResult?.steps?.length ?? 0;
  const currency = configExchangeRate.Currency;

  const currencyMap = currency.reduce<Record<string, (typeof currency)[0]>>((acc, cur) => {
    return { ...acc, [cur.value]: cur };
  }, {});

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

export default {};
