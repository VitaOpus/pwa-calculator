import { useRef, useCallback, useLayoutEffect } from 'react';

export const useDebounce = <T extends unknown[]>(fn: (...args: T) => void, delay: number) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnRef = useRef(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  });

  return useCallback(
    (...args: T) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => fnRef.current(...args), delay);
    },
    [delay],
  );
};
