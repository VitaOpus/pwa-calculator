import { ChakraProvider } from '@chakra-ui/react';

import { ApiService } from '@/shared/lib';
import { ErrorBoundary, ErrorBoundaryError } from '@/shared/ui';

import { system } from './style.ts';

import { App } from './app.tsx';

const apiService = ApiService.getInstance();

const { VITE_CALCULATOR_SERVICE } = import.meta.env;

function Root() {
  apiService.setAppSettings({
    CALCULATOR_SERVICE: VITE_CALCULATOR_SERVICE,
  });

  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export default Root;
