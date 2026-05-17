import { chainRoute } from 'atomic-router';

import { useAppForm } from '@/shared/lib/form-hook';
import { routes } from '@/shared/routing';
import { serviceExchangeRate } from '@/shared/service';

export const exchangeRateCalculationRoute = chainRoute({
  route: routes.exchangeRateCalculation,
  beforeOpen: serviceExchangeRate.effect.getCurrencyRatesFx,
});

export const usePageForm = () =>
  useAppForm({
    defaultValues: {
      steps: ['USD'] as string[],
      amount: '10',
    },
    onSubmit: () => {},
  });

export default {};