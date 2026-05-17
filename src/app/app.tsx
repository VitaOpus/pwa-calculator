import { RouterProvider, Route } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { Main, ExchangeRateCalculation } from '@/pages';
import { exchangeRateCalculationRoute } from '@/pages/exchange-rate-calculation/model';
import { router, routes, history } from '@/shared/routing';

export function App() {
  const setHistory = useUnit(router.setHistory);

  useEffect(() => {
    setHistory(history);
  }, [setHistory]);

  return (
    <RouterProvider router={router}>
      <Route route={routes.main} view={Main} />
      <Route route={exchangeRateCalculationRoute} view={ExchangeRateCalculation} />
    </RouterProvider>
  );
}
