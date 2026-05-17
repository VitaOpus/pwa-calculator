import { createEvent, sample } from 'effector';

import { serviceExchangeRate } from '@/shared/service';

import { $amount, $steps } from './store';

export const stepsChanged = createEvent<string[]>();
export const amountChanged = createEvent<string>();

sample({ clock: stepsChanged, target: $steps });
sample({ clock: amountChanged, target: $amount });

sample({
  clock: stepsChanged,
  source: $amount,
  filter: (_, steps) => steps.length > 1,
  fn: (amount, steps) => ({ steps, amount }),
  target: serviceExchangeRate.event.exchangeRate,
});

sample({
  clock: stepsChanged,
  filter: (steps) => steps.length < 2,
  fn: () => null,
  target: serviceExchangeRate.store.$exchangeRate,
});

sample({
  clock: amountChanged,
  source: $steps,
  filter: (steps, amount) => steps.length > 1 && Number(amount) > 0,
  fn: (steps, amount) => ({ steps, amount }),
  target: serviceExchangeRate.event.exchangeRate,
});