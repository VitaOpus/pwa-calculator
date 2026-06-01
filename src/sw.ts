import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import type { CachedResponseWillBeUsedCallbackParam } from 'workbox-core/types';

const CACHE_NAME = 'currency-rates';
const RATES_URL = '/api/v1/rates';

cleanupOutdatedCaches();
precacheAndRoute((self as unknown as ServiceWorkerGlobalScope).__WB_MANIFEST);

function isCacheFresh(response: Response): boolean {
  const maxAge = response.headers.get('Cache-Control')?.match(/max-age=(\d+)/)?.[1];
  const date = response.headers.get('Date');

  if (!maxAge || !date) {
    return false;
  }

  return Date.now() < new Date(date).getTime() + parseInt(maxAge) * 1000;
}

const maxAgePlugin = {
  // Плагин получает остаток серверного TTL и применяет его к локальному кешу для синхронной инвалидации
  cachedResponseWillBeUsed: async ({ cachedResponse }: CachedResponseWillBeUsedCallbackParam) => {
    if (!cachedResponse) {
      return null;
    }

    return isCacheFresh(cachedResponse) ? cachedResponse : null;
  },
};

registerRoute(
  /\/api\/v1\/rates$/,
  new CacheFirst({
    cacheName: CACHE_NAME,
    plugins: [maxAgePlugin],
  }),
);

// Периодический опрос ручек
self.addEventListener('periodicsync', (event: Event) => {
  const syncEvent = event as PeriodicSyncEvent;

  if (syncEvent.tag === CACHE_NAME) {
    syncEvent.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(RATES_URL);

        if (cached && isCacheFresh(cached)) return;

        try {
          const response = await fetch(RATES_URL);
          await cache.put(RATES_URL, response.clone());
        } catch {
          // сеть пропала — старый кеш остаётся, браузер повторит sync позже
        }
      }),
    );
  }
});
