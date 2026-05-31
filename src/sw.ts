import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import type { CachedResponseWillBeUsedCallbackParam } from 'workbox-core/types';

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

const maxAgePlugin = {
  cachedResponseWillBeUsed: async ({ cachedResponse }: CachedResponseWillBeUsedCallbackParam) => {
    if (!cachedResponse) {
      return null;
    }

    const cacheControl = cachedResponse.headers.get('Cache-Control');
    const maxAge = cacheControl?.match(/max-age=(\d+)/)?.[1];
    const date = cachedResponse.headers.get('Date');

    if (maxAge && date) {
      const expiresAt = new Date(date).getTime() + parseInt(maxAge) * 1000;
      if (Date.now() > expiresAt) {
        return null;
      }
    }

    return cachedResponse;
  },
};

registerRoute(
  /\/api\/v1\/rates$/,
  new CacheFirst({
    cacheName: 'currency-rates',
    plugins: [maxAgePlugin],
  }),
);
