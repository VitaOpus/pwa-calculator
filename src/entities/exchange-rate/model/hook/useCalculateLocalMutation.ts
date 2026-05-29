import { useMutation } from '@tanstack/react-query';

import { calculateLocal } from '@/shared/service/exchange-rate/effect';

export const useCalculateLocalMutation = () =>
  useMutation({
    mutationFn: calculateLocal,
  });
