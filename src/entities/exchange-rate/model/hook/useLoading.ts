import { useExchangeRateContext } from './ExchangeCalculationContext';

export const useLoading = () => useExchangeRateContext().isPending;