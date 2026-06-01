/// <reference types="vite/client" />

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PeriodicSyncManager {
  register(tag: string, options?: { minInterval: number }): Promise<void>;
  unregister(tag: string): Promise<void>;
  getTags(): Promise<string[]>;
}

interface ServiceWorkerRegistration {
  readonly periodicSync: PeriodicSyncManager;
}

interface PeriodicSyncEvent extends Event {
  readonly tag: string;
  waitUntil(f: Promise<unknown>): void;
}

interface ImportMetaEnv {
  readonly VITE_CALCULATOR_SERVICE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
