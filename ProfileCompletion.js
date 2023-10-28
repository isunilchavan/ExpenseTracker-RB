import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const ProfileCompletion = ({ idToken }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState(null);

  const handleUpdateProfile = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC_HpCdTjxQoqVXs3kMseePbJWhRqaF1sQ`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          displayName: displayName,
          photoUrl: photoUrl,
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
          // Profile updated successfully
          setIsEditing(false);
          setDisplayName(data.displayName); // Update the state with new displayName
          setPhotoUrl(data.photoUrl); // Update the state with new PhotoUrl

          // Reset the input fields
          setDisplayName("");
          setPhotoUrl("");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      {isEditing ? (
        <Form>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Profile URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your profile URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleUpdateProfile}
            className="mt-2"
          >
            Update
          </Button>
          <Button
            variant="danger"
            onClick={() => setIsEditing(false)}
            className="mt-2 ml-2"
          >
            Cancel
          </Button>
        </Form>
      ) : (
        <div>
          <p>Your profile is incomplete</p>
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Complete Now
          </Button>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
};

export default ProfileCompletion;
