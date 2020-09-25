import React from 'react';

// Tests for Header component
import { render, screen } from '@testing-library/react';
import Header from './index';

test('Should render a header', () => {
  render(<Header />);
  expect(screen.getByTestId('title')).toHaveAttribute('href', '#home');
  expect(screen.getByTestId('title')).toHaveTextContent('Big Macs Demo');
});
