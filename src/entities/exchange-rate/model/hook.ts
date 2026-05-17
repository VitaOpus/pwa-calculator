import { useUnit } from 'effector-react';

import { serviceExchangeRate } from '@/shared/service';

export const useLoading = () => {
  return useUnit(serviceExchangeRate.store.$loading);
};

export default {};
