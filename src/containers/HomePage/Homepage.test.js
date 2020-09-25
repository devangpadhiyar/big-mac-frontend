import React from 'react';

// Tests for Header component
import { fireEvent, render, screen } from '@testing-library/react';
import { CountryProvider } from '../../providers/CountryProvider';
import HomePage from './index';

const mockProviderValue = [
  {
    status: 'success',
    data: {
      ipv4: '8.8.8.8',
      continent_name: 'North America',
      country_name: 'United States',
      subdivision_1_name: 'California',
      subdivision_2_name: null,
      city_name: 'Mountain View',
      latitude: '37.38600',
      longitude: '-122.08380',
    },
  },
  null,
];

test('Should Have a country when context provides it', () => {
  // Mocking with fake country
  const { container } = render(
    <CountryProvider value={mockProviderValue}>
      <HomePage />
    </CountryProvider>
  );

  expect(screen.getByTestId('country-container')).toHaveTextContent(
    'You are in United States.'
  );
});

test('Test the price input', () => {
  const { container, getByTestId } = render(
    <CountryProvider value={mockProviderValue}>
      <HomePage />
    </CountryProvider>
  );
  const priceInput = screen.getByTestId('price-input');
  fireEvent.change(priceInput, { target: { value: 25 } });
  expect(priceInput.value).toBe('25');
});
