import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="head text-center">
    <Navbar expand="md" variant="light" className="shadow-sm">
      <Container className="d-flex justify-content-center">
        {/* Logo Section */}
        <Navbar.Brand href="#home" className="d-flex justify-content-center">
          {/* <img
            src="/path-to-your-logo.png"
            alt=""
            className="header-logo"
          /> */}
          <span className="ms-2">Supomodoro</span>
        </Navbar.Brand>
  
        {/* Toggle Button for Mobile */}
        {/* <Navbar.Toggle aria-controls="navbar-nav" /> */}
  
        {/* Navigation Links */}
        {/* <Navbar.Collapse id="navbar-nav" className="d-flex justify-content-center"> */}
          {/* <Nav className="ms-auto">
            <Nav.Link href="">Home</Nav.Link>
            <Nav.Link href="https://skvprogrammer.github.io">Dev</Nav.Link>
            <Nav.Link href="mailto:satyamkumarverman@gmail.com">Email Us</Nav.Link>
          </Nav> */}
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  </header>
  
  );
};

export default Header;
