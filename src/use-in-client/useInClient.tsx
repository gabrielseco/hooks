import React, { useMemo } from 'react';

export function useInClient<T>(callback: () => T) {
  const [isClient, setClient] = React.useState(false);
  const refCallback = React.useRef<typeof callback | null>(null);

  React.useLayoutEffect(() => {
    refCallback.current = callback;
  });

  React.useEffect(() => {
    setClient(true);
  }, []);

  return useMemo<T | null>(() => {
    return isClient && refCallback && refCallback.current
      ? refCallback.current()
      : null;
  }, [isClient]);
}
