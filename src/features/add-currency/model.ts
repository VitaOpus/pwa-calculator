import { useMemo } from 'react';
import { useField } from '@tanstack/react-form';
import { useUnit } from 'effector-react';

import type { SelectValueChangeDetails } from '@chakra-ui/react';
import { createListCollection } from '@chakra-ui/react';

import { configExchangeRate, modelExchangeRate, useAppFormContext } from '@/entities/exchange-rate';

export const useController = () => {
  const form = useAppFormContext();
  const steps = useField({ form, name: 'steps' });

  const stepsChanged = useUnit(modelExchangeRate.event.stepsChanged);

  const collection = useMemo(
    () =>
      createListCollection({
        items: configExchangeRate.Currency,
        itemToString: (item) => `${item.flag} ${item.label}`,
        itemToValue: (item) => item.value,
      }),
    [],
  );

  const handleSelect = (data: SelectValueChangeDetails) => {
    const next = [...steps.state.value, data.value[0]];
    steps.handleChange(next);
    stepsChanged(next);
  };

  const handleVibrate = () => {
    navigator.vibrate?.(50);
  };

  return {
    collection,
    onSelect: handleSelect,
    onVibrate: handleVibrate,
  };
};
