import { useState, useEffect, useRef } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export const useController = () => {
  const promptRef = useRef<BeforeInstallPromptEvent | null>(null);

  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      promptRef.current = e as BeforeInstallPromptEvent;
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onInstall = async () => {
    if (!promptRef.current) {
      return;
    }

    await promptRef.current.prompt();

    const { outcome } = await promptRef.current.userChoice;

    if (outcome === 'accepted') {
      promptRef.current = null;
      setCanInstall(false);
    }
  };

  return { canInstall, onInstall };
};
