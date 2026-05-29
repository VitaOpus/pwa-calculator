import { useMutation } from '@tanstack/react-query';

import { exchangeCurrency } from '@/shared/api';

export const useExchangeMutation = () =>
  useMutation({
    mutationFn: exchangeCurrency,
  });
