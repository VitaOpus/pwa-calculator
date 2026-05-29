import { useQuery } from '@tanstack/react-query';

import { getCurrencyRates } from '@/shared/api';

export const useCurrencyRates = () =>
  useQuery({
    queryKey: ['currency-rates'],
    queryFn: getCurrencyRates,
    staleTime: 60 * 60_000,
  });
