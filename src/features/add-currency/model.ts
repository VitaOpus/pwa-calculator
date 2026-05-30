import { useField } from '@tanstack/react-form';

import type { SelectValueChangeDetails } from '@chakra-ui/react';

import { useExchangeRateContext } from '@/shared/service/exchange-rate';

import { configExchangeRate, useAppFormContext } from '@/entities/exchange-rate';

export const useController = () => {
  const form = useAppFormContext();
  const steps = useField({ form, name: 'steps' });
  const amount = useField({ form, name: 'amount' });
  const { onStepsChange } = useExchangeRateContext();

  const handleSelect = (data: SelectValueChangeDetails) => {
    const next = [...steps.state.value, data.value[0]];
    steps.handleChange(next);
    onStepsChange(next, amount.state.value);
  };

  return {
    currency: configExchangeRate.Currency,
    onSelect: handleSelect,
  };
};
