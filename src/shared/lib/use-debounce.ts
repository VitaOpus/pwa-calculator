import { useRef, useCallback } from 'react';

export const useDebounce = <T extends unknown[]>(fn: (...args: T) => void, delay: number) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: T) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay],
  );
};
