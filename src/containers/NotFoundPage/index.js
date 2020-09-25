import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const NotFound = (props) => {
  return (
    <Container>
      <Row>
        <Col className={'h-100'}>Not found!</Col>
      </Row>
    </Container>
  );
};

NotFound.propTypes = {};

export default NotFound;
