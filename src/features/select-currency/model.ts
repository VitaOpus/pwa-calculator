import { useTransition, useMemo } from 'react';

import { useField } from '@tanstack/react-form';
import { useUnit } from 'effector-react';

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

  const enrichedSteps = useMemo(
    () =>
      exchangeRate?.steps?.map((step, index) => ({
        ...step,
        isAction: count === index + 1,
      })) ?? [],
    [exchangeRate?.steps, count],
  );

  const currencyMap = useMemo(
    () =>
      configExchangeRate.Currency.reduce<Record<string, (typeof configExchangeRate.Currency)[0]>>(
        (acc, cur) => ({ ...acc, [cur.value]: cur }),
        {},
      ),
    [],
  );

  const handleDelete = (index: number) => () => {
    const next = steps.state.value.filter((_: string, i: number) => i !== index + 1);
    steps.handleChange(next);
    startTransition(() => {
      stepsChanged(next);
    });
  };

  return {
    enrichedSteps,
    currencyMap,
    onDelete: handleDelete,
  };
};
