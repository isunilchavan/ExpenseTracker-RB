import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";

const EmailVerification = ({ idToken, email }) => {
  const [verificationError, setVerificationError] = useState(null);
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const handleSendVerificationEmail = () => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC_HpCdTjxQoqVXs3kMseePbJWhRqaF1sQ`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: idToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setVerificationError(data.error.message);
        } else {
          setIsVerificationSent(true);
        }
      })
      .catch((error) => {
        setVerificationError(error.message);
      });
  };

  return (
    <div>
      {isVerificationSent ? (
        <p>
          A verification email has been sent to {email}. Please check your inbox
          and verify your email.
        </p>
      ) : (
        <Button
          variant="primary"
          onClick={handleSendVerificationEmail}
          className="mt-2"
        >
          Send Verification Email
        </Button>
      )}
      {verificationError && (
        <Alert variant="danger" className="mt-3">
          {verificationError}
        </Alert>
      )}
    </div>
  );
};

export default EmailVerification;
