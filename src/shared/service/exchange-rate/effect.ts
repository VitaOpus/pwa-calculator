import { type ExchangeResponseV1, type GetCurrencyRatesResponseV1 } from '@/shared/api';

const worker = new Worker(new URL('./calculate.worker.ts', import.meta.url), { type: 'module' });

let messageId = 0;
const pending = new Map<number, (result: ExchangeResponseV1) => void>();

worker.onmessage = (e: MessageEvent<{ id: number; result: ExchangeResponseV1 }>) => {
  const { id, result } = e.data;
  pending.get(id)?.(result);
  pending.delete(id);
};

export const calculateLocal = ({
  amount,
  steps,
  rates,
}: {
  amount: string;
  steps: string[];
  rates: GetCurrencyRatesResponseV1;
}): Promise<ExchangeResponseV1> =>
  new Promise((resolve) => {
    const id = ++messageId;
    pending.set(id, resolve);
    worker.postMessage({ id, amount: Number(amount), steps, rates });
  });
