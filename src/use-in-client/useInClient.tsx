import React from 'react';

export function useInClient<T>(callback: () => T): T | null {
  const [valueCallback, setValueCallback] = React.useState<T | null>(null);
  const [isClient, setClient] = React.useState(false);

  const memoizedCallback = React.useCallback(() => callback(), [callback]);

  React.useEffect(() => {
    setClient(true);
  }, []);

  React.useEffect(() => {
    if (isClient) {
      const calculatedValue = memoizedCallback();
      setValueCallback(calculatedValue);
    }
  }, [isClient, memoizedCallback]);

  return valueCallback;
}
