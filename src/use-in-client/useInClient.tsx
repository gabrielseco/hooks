import React from 'react';

export function useInClient<T>(callback: () => T): T | null {
  const [valueCallback, setValueCallback] = React.useState<T | null>(null);
  const [isClient, setClient] = React.useState(false);
  const refCallback = React.useRef<unknown | null>(null);

  React.useLayoutEffect(() => {
    refCallback.current = callback;
  });

  React.useEffect(() => {
    setClient(true);
  }, []);

  React.useEffect(() => {
    if (isClient && refCallback.current) {
      const calculatedValue = (refCallback as any).current();
      setValueCallback(calculatedValue);
    }
  }, [isClient]);

  return valueCallback;
}
