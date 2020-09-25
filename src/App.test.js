import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { CountryProvider } from './providers/CountryProvider';

test('Should render a application with Header correctly', async () => {
  // Render application
  render(
    <CountryProvider>
      <App />
    </CountryProvider>
  );
  expect(screen.getByText('Big Macs Demo').textContent).toBe('Big Macs Demo');
});
