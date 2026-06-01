import { ChangeEvent, useTransition, useMemo } from 'react';

import type { SelectValueChangeDetails } from '@chakra-ui/react';
import { createListCollection } from '@chakra-ui/react';
import { useField } from '@tanstack/react-form';
import { useUnit } from 'effector-react';

import { useDebounce } from '@/shared/lib';
import { configExchangeRate, modelExchangeRate, useAppFormContext } from '@/entities/exchange-rate';

export const useController = () => {
  const form = useAppFormContext();
  const steps = useField({ form, name: 'steps' });
  const amount = useField({ form, name: 'amount' });
  const [, startTransition] = useTransition();

  const { stepsChanged, amountChanged } = useUnit({
    stepsChanged: modelExchangeRate.event.stepsChanged,
    amountChanged: modelExchangeRate.event.amountChanged,
  });

  const collection = useMemo(
    () =>
      createListCollection({
        items: configExchangeRate.Currency,
        itemToString: (item) => `${item.flag} ${item.label}`,
        itemToValue: (item) => item.value,
      }),
    [],
  );

  const debouncedAmountChanged = useDebounce(
    (value: string) =>
      startTransition(() => {
        amountChanged(value);
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
        stepsChanged(next);
      });
    };
  };

  return {
    collection,
    canAddCurrency: steps.state.value.length === 1,
    amount: amount.state.value,
    onAmountChange: handleAmountChange,
    onCurrencyChange: handleCurrencyChange,
  };
};
