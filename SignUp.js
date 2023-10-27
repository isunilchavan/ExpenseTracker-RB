import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_HpCdTjxQoqVXs3kMseePbJWhRqaF1sQ";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error.message);
        } else {
          // Successful signup
          console.log("User has successfully signed up.");

          // Reset the form
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setError(null);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={4}>
          <h1 className="mt-4">Sign Up</h1>
          <Form>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={handleSignup}>
              Sign Up
            </Button>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            <p className="mt-3">
              Have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
