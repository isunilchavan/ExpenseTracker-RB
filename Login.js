import React, { useState } from "react";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProfileCompletion from "./ProfileCompletion";
import EmailVerification from "./EmailVerification";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [idToken, setIdToken] = useState("");

  const handleLogin = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_HpCdTjxQoqVXs3kMseePbJWhRqaF1sQ`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error.message);
        } else {
          console.log("User has successfully logged in.");
          // Set authentication status
          localStorage.setItem("idToken", data.idToken);
          setIsAuthenticated(true);
          setIdToken(data.idToken);
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
          {isAuthenticated ? (
            <>
              <Dashboard />
              <ProfileCompletion idToken={idToken} />
              <EmailVerification idToken={idToken} email={email} />
            </>
          ) : (
            <>
              <h1 className="mt-4">Login</h1>
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
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
                <p className="mt-3">
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
