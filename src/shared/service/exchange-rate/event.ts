import { createEvent, sample } from 'effector';

import type { ExchangeRequestV1 } from '@/shared/api';

import { setLoading } from '@/shared/lib';

import { exchangeRateFx, getCurrencyRatesFx } from './effect';

import { $loading, $exchangeRate, $currencyRates } from './store';

export const exchangeRate = createEvent<ExchangeRequestV1>();

export const getCurrencyRates = createEvent<void>();

sample({
  clock: exchangeRate,
  target: exchangeRateFx,
});
sample({
  clock: exchangeRateFx.doneData,
  target: $exchangeRate,
});

sample({
  clock: getCurrencyRates,
  target: getCurrencyRatesFx,
});
sample({
  clock: getCurrencyRatesFx.doneData,
  target: $currencyRates,
});

setLoading($loading, exchangeRateFx);
