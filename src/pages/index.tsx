import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

import { serviceExchangeRate } from '@/shared/service';

import { Main } from './main';
import { ExchangeRateCalculation } from './exchange-rate-calculation';

interface RouterContext {
  queryClient: QueryClient;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});

const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Main,
});

const exchangeRateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/exchange-rate-calculation',
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(serviceExchangeRate.currencyRatesQueryOptions),
  component: ExchangeRateCalculation,
});

const routeTree = rootRoute.addChildren([mainRoute, exchangeRateRoute]);

export const router = createRouter({
  routeTree,
  context: {
    queryClient: undefined!,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
