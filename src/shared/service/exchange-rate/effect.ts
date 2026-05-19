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

getCurrencyRatesFx.use(getCurrencyRates);
exchangeRateFx.use(exchangeCurrency);

// Worker для локального расчёта курсов без обращения к серверу
const worker = new Worker(new URL('./calculate.worker.ts', import.meta.url), { type: 'module' });

let messageId = 0;
const pending = new Map<number, (result: ExchangeResponseV1) => void>();

worker.onmessage = (e: MessageEvent<{ id: number; result: ExchangeResponseV1 }>) => {
  const { id, result } = e.data;
  pending.get(id)?.(result);
  pending.delete(id);
};

export const calculateLocalFx = createEffect(
  ({
    amount,
    steps,
    rates,
  }: {
    amount: string;
    steps: string[];
    rates: GetCurrencyRatesResponseV1;
  }) =>
    new Promise<ExchangeResponseV1>((resolve) => {
      const id = ++messageId;
      pending.set(id, resolve);
      worker.postMessage({ id, amount: Number(amount), steps, rates });
    }),
);
