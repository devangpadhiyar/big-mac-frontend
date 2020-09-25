import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const Header = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home" data-testid={'title'}>
        Big Macs Demo
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {};

export default Header;
