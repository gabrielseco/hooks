import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';

import { useAsync } from './useAsync';

describe('UseAsync', () => {
  jest.useFakeTimers();

  it('should set loading state to true without resolving the promise', () => {
    const Component = () => {
      const { loading } = useAsync(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(1);
            }, 2000);
          })
      );

      return <p>{loading.toString()}</p>;
    };

    render(<Component />);

    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('should set loading state to false after resolving the promise', async () => {
    const Component = () => {
      const { loading } = useAsync(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(1);
            }, 2000);
          })
      );

      return <p>{loading.toString()}</p>;
    };

    render(<Component />);

    act(() => jest.runAllTimers());

    await waitFor(() => screen.getByText('false'));
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('should retrieve the data of the promise passed', async () => {
    const promise = new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 2000);
    });

    const Component = () => {
      const { value } = useAsync(() => promise);

      return <p>{value}</p>;
    };

    render(<Component />);

    act(() => jest.runAllTimers());

    await waitFor(() => screen.getByText('1'));

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should retrieve the error', async () => {
    const promise = new Promise<number>((_, reject) => {
      setTimeout(() => {
        reject(new Error('hello bro'));
      }, 2000);
    });

    const Component = () => {
      const { error } = useAsync(() => promise);

      return <p>{error?.message}</p>;
    };

    render(<Component />);

    act(() => jest.runAllTimers());

    await waitFor(() => screen.getByText('hello bro'));

    expect(screen.getByText('hello bro')).toBeInTheDocument();
  });
});
