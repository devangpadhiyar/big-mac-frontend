import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import './Homepage.css';
import { useCountry } from '../../providers/CountryProvider';
import { getGlobalProduct, getLocalProduct } from '../../api/products';
import LocalProduct from '../../components/HomePage/LocalProduct';
import GlobalProduct from '../../components/HomePage/GlobalProduct';

const HomePage = (props) => {
  const { state } = useCountry();
  const { status, data } = state;
  const [price, setPrice] = useState(0);

  const [localProduct, setLocalProduct] = useState({
    data: null,
    status: '',
  });
  const [globalProduct, setGlobalProduct] = useState({
    data: null,
    status: '',
  });

  // Function to fetch local products
  const fetchLocalProducts = async () => {
    setLocalProduct({
      data: null,
      status: 'loading',
    });
    const response = await getLocalProduct(data.country_name);
    if (response.status === 200) {
      // If local product can be find then go for global ones!
      fetchGlobalProducts();
      setLocalProduct({
        data: response.data,
        status: 'success',
      });
    }
  };

  // Function to fetch global products
  const fetchGlobalProducts = async () => {
    setGlobalProduct({
      data: null,
      status: 'loading',
    });
    const response = await getGlobalProduct(data.country_name);
    if (response.status === 200) {
      setGlobalProduct({
        data: response.data,
        status: 'success',
      });
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    // Fetch local products
    fetchLocalProducts();
  };

  return (
    <Container className={'mt-2 fullscreen-container'}>
      <Row style={{ height: '33%' }}>
        <Col>
          {status === 'loading' && (
            <div
              className={
                'd-flex justify-content-center align-items-center h-100'
              }
            >
              <Spinner animation="border" />
            </div>
          )}
          {status === 'success' && (
            <>
              <p data-testid={'country-container'}>
                You are in {data.country_name}.
              </p>
              <Form onSubmit={onSubmitForm}>
                <Form.Group as={Row}>
                  <Form.Label column sm={'8'}>
                    Please enter an amount of money in your local currency
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control
                      type={'number'}
                      value={price}
                      onChange={(e) => {
                        setPrice(Number(e.target.value));
                      }}
                      data-testid={'price-input'}
                    />
                  </Col>
                  <Col sm="2">
                    <Button
                      type={'submit'}
                      varient={'primary'}
                      data-testid={'price-submit'}
                    >
                      Submit
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </>
          )}
        </Col>
      </Row>
      <Row style={{ height: '33%' }}>
        <Col>
          <LocalProduct
            status={localProduct.status}
            data={localProduct.data}
            price={price}
          />
        </Col>
      </Row>
      <Row style={{ height: '33%' }}>
        <Col>
          <GlobalProduct
            localProductStatus={localProduct.status}
            status={globalProduct.status}
            data={globalProduct.data}
            price={price}
            localData={localProduct.data}
          />
        </Col>
      </Row>
    </Container>
  );
};

HomePage.propTypes = {};

export default HomePage;
