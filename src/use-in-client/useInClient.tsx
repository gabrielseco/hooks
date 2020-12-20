import { useMemo, useLayoutEffect, useEffect, useState, useRef } from 'react';

export function useInClient<T>(callback: () => T) {
  const [isClient, setClient] = useState(false);
  const refCallback = useRef<typeof callback | null>(null);

  useLayoutEffect(() => {
    refCallback.current = callback;
  });

  useEffect(() => {
    setClient(true);
  }, []);

  return useMemo<T | null>(() => {
    return isClient && refCallback && refCallback.current
      ? refCallback.current()
      : null;
  }, [isClient]);
}
