export async function registerPeriodicSync(tag: string, minInterval: number): Promise<void> {
  if (!('serviceWorker' in navigator) || !('periodicSync' in ServiceWorkerRegistration.prototype)) {
    return;
  }

  const sw = await navigator.serviceWorker.ready;
  const status = await navigator.permissions.query({
    name: 'periodic-background-sync' as PermissionName,
  });

  if (status.state === 'granted') {
    await sw.periodicSync.register(tag, { minInterval });
  }
}
