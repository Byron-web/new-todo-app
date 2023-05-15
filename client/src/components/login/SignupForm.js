import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

/* his code imports React and the useState hook from the "react" library, as well as Modal, Form, and Button components from the "react-bootstrap" library.

The code defines a functional component called SignupForm which takes in a prop called handleShowLogin. This component contains a form with three inputs: username, password, and confirmPassword. When the user submits the form by clicking the "Sign up" button, the handleSubmit function is called. It first checks if the entered passwords match. If they do not match, it sets the signupError state to "Passwords do not match" and returns.

If the passwords match, the function sends a POST request to the "/api/users/register" endpoint with the username and password entered by the user. If the response is successful, it sets the signupSuccess state to true and clears the signupError state. If the response is not successful, it sets the signupSuccess state to false and sets the signupError state to the error message returned by the server.

The form also contains two buttons: "Log in" and "Sign up". Clicking the "Log in" button will call the handleShowLogin function passed in as a prop. Clicking the "Sign up" button will submit the form.

The component also conditionally renders a success or error message depending on the state of signupSuccess and signupError. If signupSuccess is true, it displays a green "Sign up successful!" message. If signupError is not an empty string, it displays a red error message with the error message returned by the server. */

const SignupForm = ({ handleShowLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (!res.ok) {
        setSignupError((await res.json()).err);
        return;
      }
      setSignupSuccess(true);
      setSignupError("");
    } catch (err) {
      console.log(err);
      setSignupSuccess(false);
      setSignupError(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your username with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      <div className="d-flex justify-content-around align-items-center mb-3">
        <Button variant="primary" onClick={handleShowLogin}>
          Log in
        </Button>
        <p className="m-0">Or</p>
        <Button variant="success" type="submit">
          Sign up
        </Button>
      </div>
      {signupSuccess && (
        <div className="text-success mt-3">Sign up successful!</div>
      )}
      {signupError && <div className="text-danger mt-3">{signupError}</div>}
    </Form>
  );
};

export default SignupForm;
