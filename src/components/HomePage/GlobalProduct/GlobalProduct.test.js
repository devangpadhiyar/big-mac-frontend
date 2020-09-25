import React from 'react';

// Tests for Header component
import { render, screen } from '@testing-library/react';
import GlobalProduct from './index';

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
const globalProduct = {
  status: 'success',
  data: {
    Country: 'Argentina',
    Date: '2000-04-01',
    'Local price': '2.5',
    'Dollar ex': '1.0',
    'Dollar price': '2.5',
    'Dollar PPP': '0.9960159362549802',
    'Dollar valuation': '-0.3984063745019806',
  },
};

test('Should render a component if local product and global product passed', () => {
  const numberOfItems =
    (Number(price) / Number(localProduct.data['Local price'])) *
    (Number(localProduct.data['Dollar price']) /
      Number(globalProduct.data['Dollar price']));

  const localPriceWorthInRandCountry =
    (Number(localProduct.data['Dollar price']) * Number(price)) /
    Number(globalProduct.data['Dollar price']);

  render(
    <GlobalProduct
      status={'success'}
      localProductStatus={'success'}
      price={price}
      localData={localProduct.data}
      data={globalProduct.data}
    />
  );

  // Foreign country title should include name
  expect(screen.getByTestId('foreign-country-title')).toHaveTextContent(
    'Argentina'
  );
  expect(screen.getByTestId('price-data')).toHaveTextContent(
    `${parseInt(numberOfItems)}`
  );
  expect(screen.getByTestId('price-data')).toHaveTextContent(`${price}`);
  expect(screen.getByTestId('foreign-price-data')).toHaveTextContent(
    `${localPriceWorthInRandCountry}`
  );
  // There will not be loader in the UI
  expect(screen.queryByTestId('global-product-loader')).toBeNull();
});

test('Show loading if local product is loading and global product is also loading', () => {
  const { rerender } = render(
    <GlobalProduct
      status={'loading'}
      localProductStatus={null}
      price={price}
      localData={localProduct.data}
      data={globalProduct.data}
    />
  );
  // There should be a loader
  expect(screen.queryByTestId('global-product-loader')).not.toBeNull();

  rerender(
    <GlobalProduct
      status={'loading'}
      localProductStatus={'success'}
      price={price}
      localData={localProduct.data}
      data={globalProduct.data}
    />
  );

  // There should be a loader
  expect(screen.queryByTestId('global-product-loader')).not.toBeNull();

  rerender(
    <GlobalProduct
      status={'success'}
      localProductStatus={'success'}
      price={price}
      localData={localProduct.data}
      data={globalProduct.data}
    />
  );

  // Foreign country title should include name
  expect(screen.getByTestId('foreign-country-title')).toHaveTextContent(
    'Argentina'
  );
  // There will not be loader in the UI
  expect(screen.queryByTestId('global-product-loader')).toBeNull();
});
