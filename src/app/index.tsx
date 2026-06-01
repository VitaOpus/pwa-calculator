import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { ApiService, registerPeriodicSync } from '@/shared/lib';
import { ErrorBoundary, ErrorBoundaryError } from '@/shared/ui';

import { system } from './style.ts';

import { App } from './app.tsx';
import { serviceExchangeRate } from '@/shared/service';

const apiService = ApiService.getInstance();

const { VITE_CALCULATOR_SERVICE } = import.meta.env;

function Root() {
  apiService.setAppSettings({
    CALCULATOR_SERVICE: VITE_CALCULATOR_SERVICE,
  });

  useEffect(() => {
    // Обновление данных в кеше SW по истечении серверного TTL с дефолтом в 1ч (не работает в Safari)
    void registerPeriodicSync('currency-rates', 60 * 60 * 1000);
  }, []);

  useEffect(() => {
    // Запрос на обновление данных когда пользователь возвращается на вкладку после того как она была скрыта
    // Это еще один вариант предзагрузки данных
    const HOUR = 60 * 60 * 1000;
    let lastFetchedAt = Date.now();

    const handler = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastFetchedAt >= HOUR) {
        lastFetchedAt = Date.now();
        serviceExchangeRate.event.getCurrencyRates();
      }
    };

    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export default Root;
