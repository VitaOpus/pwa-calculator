import { convertCurrencyWithSteps } from './lib';
import type { GetCurrencyRatesResponseV1 } from '@/shared/api';

type WorkerInput = {
  id: number;
  amount: number;
  steps: string[];
  rates: GetCurrencyRatesResponseV1;
};

self.onmessage = (e: MessageEvent<WorkerInput>) => {
  const { id, amount, steps, rates } = e.data;

  try {
    const result = convertCurrencyWithSteps(amount, steps, rates);
    self.postMessage({ id, result });
  } catch (err) {
    self.postMessage({ id, error: (err as Error).message });
  }
};
