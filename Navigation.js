import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Navigation = () => {
  const handleLogout = () => {
    // to Clear the idToken from local storage
    localStorage.removeItem("idToken");

    // Redirect the user to the login page
    window.location.href = "/login";
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >EXPENSE TRACKER</Navbar.Brand>
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
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </Nav>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default Navigation;
