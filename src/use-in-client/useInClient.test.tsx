import React from 'react';
import { render, screen } from '@testing-library/react';

import { useInClient } from './useInClient';

describe('useInClient', () => {
  it('should return the value returned', () => {
    const Component = () => {
      const value = useInClient(() => 'hello');

      return <p>{value}</p>;
    };

    render(<Component />);

    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
