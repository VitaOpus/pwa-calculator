import { ERRORS } from '../../config';
import { round3 } from '../../lib';

interface CurrencyRate {
  code: string;
  name: string;
  nominal: number;
  rate: number;
}

export type Rates = Record<string, CurrencyRate>;

interface ConversionStep {
  from: string;
  to: string;
  amountFrom: number;
  amountTo: number;
  rateFromTo: number;
}

/**
 * Конвертация валют по цепочке, с выводом каждого шага (и округлением)
 */
export function convertCurrencyWithSteps(
  amount: number,
  path: string[],
  rates: Rates,
): { steps: ConversionStep[]; finalAmount: number } {
  if (path.length < 2) {
    throw new Error(ERRORS.EXCHANGE_004.message);
  }

  const steps: ConversionStep[] = [];
  let currentAmount = round3(amount);

  for (let i = 0; i < path.length - 1; i++) {
    const fromCode = path[i];
    const toCode = path[i + 1];

    const from = rates[fromCode];
    const to = rates[toCode];

    if (!from || !to) {
      throw new Error(`Missing rate for ${fromCode} or ${toCode}`);
    }

    const rubRateFrom = from.rate / from.nominal;
    const rubRateTo = to.rate / to.nominal;

    const rateFromTo = round3(rubRateFrom / rubRateTo);
    const amountTo = round3(currentAmount * rateFromTo);

    steps.push({
      from: fromCode,
      to: toCode,
      amountFrom: currentAmount,
      amountTo,
      rateFromTo,
    });

    currentAmount = amountTo;
  }

  return { steps, finalAmount: currentAmount };
}