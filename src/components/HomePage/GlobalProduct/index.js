import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

const GlobalProduct = (props) => {
  const { status, data, price, localData, localProductStatus } = props;

  if (status === 'loading' || localProductStatus === 'loading') {
    return (
      <>
        <hr className={'divider'} />
        <div
          data-testid={'global-product-loader'}
          className={'d-flex justify-content-center align-items-center h-100'}
        >
          <Spinner animation="border" />
        </div>
      </>
    );
  }

  if (status === 'success') {
    const localPrice = localData ? Number(localData['Local price']) : null;
    const localDollarPrice = localData
      ? Number(localData['Dollar price'])
      : null;
    const randCountryDollarPrice = Number(data['Dollar price']);

    const numberOfItems =
      localPrice && randCountryDollarPrice
        ? (price / localPrice) * (localDollarPrice / randCountryDollarPrice)
        : 0;

    const localPriceWorthInRandCountry = randCountryDollarPrice
      ? (localDollarPrice * price) / randCountryDollarPrice
      : 0;

    return (
      <>
        <hr className={'divider'} />
        <div>
          <p data-testid={'foreign-country-title'}>
            Results compared to random country Random Country: {data.Country}
          </p>
          <p data-testid={'price-data'}>
            You could buy {parseInt(numberOfItems)} of Big Macs in{' '}
            {data.Country} with {price}!{' '}
          </p>
          <p data-testid={'foreign-price-data'}>
            Your {price} is worth about {localPriceWorthInRandCountry} in{' '}
            {data.Country}
          </p>
        </div>
      </>
    );
  }

  return <div></div>;
};

GlobalProduct.propTypes = {
  status: PropTypes.string,
  localProductStatus: PropTypes.string,
  data: PropTypes.object,
  localData: PropTypes.object,
  price: PropTypes.number,
};

export default GlobalProduct;
