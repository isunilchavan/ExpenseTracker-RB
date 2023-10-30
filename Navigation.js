import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Navigation = ({ isAuthenticated, handleLogout }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>EXPENSE TRACKER</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/contact" className="nav-link">
            Contact Us
          </Link>
          {isAuthenticated ? (
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
