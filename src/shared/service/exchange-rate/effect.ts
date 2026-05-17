import { createEffect } from 'effector';

import {
  exchangeCurrency,
  type ExchangeRequestV1,
  type ExchangeResponseV1,
  getCurrencyRates,
  type GetCurrencyRatesResponseV1,
} from '@/shared/api';

export const getCurrencyRatesFx = createEffect<void, GetCurrencyRatesResponseV1, Error>();

export const exchangeRateFx = createEffect<ExchangeRequestV1, ExchangeResponseV1, Error>();

// ============================ Messages ============================== //

getCurrencyRatesFx.use(getCurrencyRates);
exchangeRateFx.use(exchangeCurrency);
