export * from './calculatorService';

export type ExchangeStepV1 = {
  from: string;
  to: string;
  rateFromTo: number;
  amountTo: number;
};
