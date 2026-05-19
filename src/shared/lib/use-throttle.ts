import { useRef, useCallback } from 'react';

export const useThrottle = <T extends unknown[]>(fn: (...args: T) => void, limit: number) => {
  const lastCallRef = useRef<number>(0);

  return useCallback(
    (...args: T) => {
      const now = Date.now();

      if (now - lastCallRef.current >= limit) {
        lastCallRef.current = now;
        fn(...args);
      }
    },
    [fn, limit],
  );
};
