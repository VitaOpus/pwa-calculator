import { useRef, useCallback, useLayoutEffect } from 'react';

export const useThrottle = <T extends unknown[]>(fn: (...args: T) => void, limit: number) => {
  const lastCallRef = useRef<number>(0);
  const fnRef = useRef(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  });

  return useCallback(
    (...args: T) => {
      const now = Date.now();

      if (now - lastCallRef.current >= limit) {
        lastCallRef.current = now;
        fnRef.current(...args);
      }
    },
    [limit],
  );
};
