import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { router } from '@/pages';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} context={{ queryClient }} />
    <ReactQueryDevtools initialIsOpen={false} />
    <TanStackRouterDevtools router={router} initialIsOpen={false} />
  </QueryClientProvider>
);
