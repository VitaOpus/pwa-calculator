import { ChangeEvent } from 'react';

import type { SelectValueChangeDetails } from '@chakra-ui/react';
import { useField } from '@tanstack/react-form';
import { useUnit } from 'effector-react';

import { modelExchangeRate } from '@/entities/exchange-rate';
import { useAppFormContext } from '@/shared/lib/form-hook';

export const useController = () => {
  const form = useAppFormContext();
  const steps = useField({ form, name: 'steps' });
  const amount = useField({ form, name: 'amount' });

  const { stepsChanged, amountChanged } = useUnit({
    stepsChanged: modelExchangeRate.event.stepsChanged,
    amountChanged: modelExchangeRate.event.amountChanged
  });

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(',', '.');

    const parts = value.split('.');
    if (parts[1]?.length > 2) {
      value = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    if (Number(value) >= 0) {
      amount.handleChange(value);
      amountChanged(value);
    }
  };

  const handleCurrencyChange = (index: number) => {
    return (object: SelectValueChangeDetails) => {
      const next = [...steps.state.value];
      next[index] = object.value[0];
      steps.handleChange(next);
      stepsChanged(next);
    };
  };

  return {
    isButAdd: steps.state.value.length === 1,
    amount: amount.state.value,
    onAmountChange: handleAmountChange,
    onCurrencyChange: handleCurrencyChange,
  };
};

export default {};
