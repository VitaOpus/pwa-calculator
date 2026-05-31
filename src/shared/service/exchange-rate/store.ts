import { createStore } from 'effector';

import type { ExchangeResponseV1, GetCurrencyRatesResponseV1 } from '@/shared/api';

export const $exchangeRate = createStore<ExchangeResponseV1 | null>(null);
export const $currencyRates = createStore<GetCurrencyRatesResponseV1 | null>(null);
export const $loading = createStore<boolean>(false);
