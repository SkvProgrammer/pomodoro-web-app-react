import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="head">
      <Navbar expand="md" variant="light" className="shadow-sm">
        <Container>
          {/* Logo Section */}
          <Navbar.Brand href="#home">
            {/* <img
              src="/path-to-your-logo.png"
              alt=""
              className="header-logo"
            /> */}
            <span className="ms-2">Pomodoro App</span>
          </Navbar.Brand>

          {/* Toggle Button for Mobile */}
          <Navbar.Toggle aria-controls="navbar-nav" />

          {/* Navigation Links */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="">Home</Nav.Link>
              <Nav.Link href="https://skvprogrammer.github.io">Dev</Nav.Link>
              <Nav.Link href="mailto:satyamkumarverman@gmail.com">Email Us</Nav.Link>
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
