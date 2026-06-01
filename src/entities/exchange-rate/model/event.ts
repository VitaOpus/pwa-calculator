import { createEvent, sample } from 'effector';

import { serviceExchangeRate } from '@/shared/service';

import { $amount, $steps } from './store';

export const stepsChanged = createEvent<string[]>();
export const amountChanged = createEvent<string>();

// Синхронизируем сторы при изменении шагов и суммы
sample({ clock: stepsChanged, target: $steps });
sample({ clock: amountChanged, target: $amount });

// Запрашиваем расчёт когда шагов больше одного
sample({
  clock: stepsChanged,
  source: $amount,
  filter: (_, steps) => steps.length > 1,
  fn: (amount, steps) => ({ steps, amount }),
  //target: serviceExchangeRate.event.exchangeRate, // real-time calculation
  target: serviceExchangeRate.event.exchangeLocalRate, // local calculation
});

// Сбрасываем результат расчёта когда остался один шаг
sample({
  clock: stepsChanged,
  filter: (steps) => steps.length < 2,
  fn: () => null,
  target: serviceExchangeRate.store.$exchangeRate,
});

// Запрашиваем расчёт когда изменилась сумма и шагов больше одного
sample({
  clock: amountChanged,
  source: $steps,
  filter: (steps, amount) => steps.length > 1 && Number(amount) > 0,
  fn: (steps, amount) => ({ steps, amount }),
  //target: serviceExchangeRate.event.exchangeRate, // real-time calculation
  target: serviceExchangeRate.event.exchangeLocalRate, // local calculation
});
