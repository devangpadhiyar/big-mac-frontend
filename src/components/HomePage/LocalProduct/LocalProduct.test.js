import React from 'react';

// Tests for Header component
import { render, screen } from '@testing-library/react';
import LocalProduct from './index';

const price = 25;

const localProduct = {
  status: 'success',
  data: {
    Country: 'India',
    Date: '2011-07-01',
    'Local price': '84.0',
    'Dollar ex': '44.4',
    'Dollar price': '1.8918918918918919',
    'Dollar PPP': '20.664206642066418',
    'Dollar valuation': '-53.458994049399955',
  },
};

test('Should render a component if local product and global product passed', () => {
  render(
    <LocalProduct status={'success'} data={localProduct.data} price={price} />
  );

  const numberOfItems = price / Number(localProduct.data['Local price']);

  // Local country item should include number of items
  expect(screen.getByTestId('local-price-item')).toHaveTextContent(
    `${parseInt(numberOfItems)}`
  );
  expect(screen.getByTestId('local-ppp')).toHaveTextContent(
    `${localProduct.data['Dollar PPP']}`
  );
  // There will not be loader in the UI
  expect(screen.queryByTestId('local-product-loader')).toBeNull();
});

test('Show loaders in the UI while loading', () => {
  const { rerender } = render(
    <LocalProduct status={'loading'} price={price} data={localProduct.data} />
  );
  // There should be a loader
  expect(screen.queryByTestId('local-product-loader')).not.toBeNull();

  rerender(
    <LocalProduct status={'success'} price={price} data={localProduct.data} />
  );

  // Foreign country title should include name
  expect(screen.getByTestId('local-ppp')).toHaveTextContent(
    'Your Dollar Purchasing Parity'
  );
  // There will not be loader in the UI
  expect(screen.queryByTestId('global-product-loader')).toBeNull();
});
