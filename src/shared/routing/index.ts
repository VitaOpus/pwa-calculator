import { createRoute, createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';

export const routes = {
  main: createRoute(),
  exchangeRateCalculation: createRoute(),
};

const routesMap = [
  { path: '/', route: routes.main },
  { path: '/exchange-rate-calculation', route: routes.exchangeRateCalculation },
];

export const router = createHistoryRouter({ routes: routesMap });

export const history = createBrowserHistory();
