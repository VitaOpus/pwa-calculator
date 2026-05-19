import { createEvent, sample } from 'effector';

import type { ExchangeRequestV1 } from '@/shared/api';

import { setLoading } from '@/shared/lib';

import { calculateLocalFx, exchangeRateFx, getCurrencyRatesFx } from './effect';

import { $loading, $exchangeRate, $currencyRates } from './store';

export const exchangeRate = createEvent<ExchangeRequestV1>();

export const exchangeLocalRate = createEvent<ExchangeRequestV1>();

export const getCurrencyRates = createEvent<void>();

// Запускаем эффект расчёта курса и сохраняем результат
sample({ clock: exchangeRate, target: exchangeRateFx });
$exchangeRate.on(exchangeRateFx.doneData, (_, data) => data);

// Запускаем локальный расчёт в worker и сохраняем результат
sample({
  clock: exchangeLocalRate,
  source: $currencyRates,
  filter: Boolean,
  fn: (rates, data) => ({
    amount: data.amount,
    steps: data.steps,
    rates: rates,
  }),
  target: calculateLocalFx,
});
$exchangeRate.on(calculateLocalFx.doneData, (_, data) => data);

// Запускаем загрузку списка валют и сохраняем результат
sample({ clock: getCurrencyRates, target: getCurrencyRatesFx });
$currencyRates.on(getCurrencyRatesFx.doneData, (_, data) => data);

// Отслеживаем состояние загрузки расчёта курса
setLoading($loading, exchangeRateFx);
