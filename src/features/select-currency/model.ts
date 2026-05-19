import { useTransition } from 'react';

import { useField } from '@tanstack/react-form';
import { useUnit } from 'effector-react';

import type { SelectValueChangeDetails } from '@chakra-ui/react';

import { configExchangeRate, modelExchangeRate, useAppFormContext } from '@/entities/exchange-rate';
import { serviceExchangeRate } from '@/shared/service';

export const useController = () => {
  const form = useAppFormContext();
  const steps = useField({ form, name: 'steps' });
  const [, startTransition] = useTransition();

  const stepsChanged = useUnit(modelExchangeRate.event.stepsChanged);

  const { exchangeRate } = useUnit({
    exchangeRate: serviceExchangeRate.store.$exchangeRate,
  });

  const count = exchangeRate?.steps?.length ?? 0;
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
        stepsChanged(next);
      });
    };
  };

  const handleDelete = (index: number) => () => {
    const next = steps.state.value.filter((_: string, i: number) => i !== index + 1);
    steps.handleChange(next);
    startTransition(() => {
      stepsChanged(next);
    });
  };

  const handleSelect = (data: SelectValueChangeDetails) => {
    const next = [...steps.state.value, data.value[0]];
    steps.handleChange(next);
    startTransition(() => {
      stepsChanged(next);
    });
  };

  return {
    currency,
    currencyMap,
    exchangeRate,
    count,
    onCurrencyChange: handleCurrencyChange,
    onDelete: handleDelete,
    onSelect: handleSelect,
  };
};

export default {};
