import { useMemo, useEffect, useState, useRef } from 'react';

import { useIsomorphicLayoutEffect } from '../utils';

export function useInClient<T>(callback: () => T) {
  const [isClient, setClient] = useState(false);
  const refCallback = useRef<typeof callback | null>(null);

  useIsomorphicLayoutEffect(() => {
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
