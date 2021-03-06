import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

const LocalProduct = (props) => {
  const { status, data, price } = props;
  if (status === 'loading') {
    return (
      <>
        <hr className={'divider'} />
        <div
          data-testid={'local-product-loader'}
          className={'d-flex justify-content-center align-items-center h-100'}
        >
          <Spinner animation="border" />
        </div>
      </>
    );
  }

  if (status === 'success') {
    const localPrice = Number(data['Local price']);
    const dollarPPP = data['Dollar PPP'];

    const numberOfItems = localPrice && price ? price / localPrice : 0;

    return (
      <>
        <hr className={'divider'} />
        <div>
          <p data-testid={'local-price-item'}>
            You could buy {parseInt(numberOfItems)} of Big Macs in your country.
          </p>
          <p data-testid={'local-ppp'}>
            Your Dollar Purchasing Parity (PPP) is {dollarPPP}
          </p>
        </div>
      </>
    );
  }

  return <div></div>;
};

LocalProduct.propTypes = {
  status: PropTypes.string,
  data: PropTypes.object,
  price: PropTypes.number,
};

export default LocalProduct;
