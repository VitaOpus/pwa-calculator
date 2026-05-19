import { useField } from '@tanstack/react-form';
import { useUnit } from 'effector-react';

import type { SelectValueChangeDetails } from '@chakra-ui/react';

import { configExchangeRate, modelExchangeRate, useAppFormContext } from '@/entities/exchange-rate';

export const useController = () => {
  const form = useAppFormContext();
  const steps = useField({ form, name: 'steps' });

  const stepsChanged = useUnit(modelExchangeRate.event.stepsChanged);
  const currency = configExchangeRate.Currency;

  const handleSelect = (data: SelectValueChangeDetails) => {
    const next = [...steps.state.value, data.value[0]];
    steps.handleChange(next);
    stepsChanged(next);
  };

  return {
    currency,
    onSelect: handleSelect,
  };
};
