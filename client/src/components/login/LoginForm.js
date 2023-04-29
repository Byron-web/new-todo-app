import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const LoginForm = ({ handleShowSignup, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { username, password };
    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        onLogin(data.token);
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed. Please try again.");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
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
      <div className="d-flex justify-content-around align-items-center mb-3">
        {isSignup ? (
          <p className="m-0">
            Already have an account?{" "}
            <Button variant="link" onClick={() => setIsSignup(false)}>
              Log in
            </Button>
          </p>
        ) : (
          <p className="m-0">
            Don't have an account?{" "}
            <Button variant="link" onClick={handleShowSignup}>
              Sign up
            </Button>
          </p>
        )}
      </div>
      <Button variant="primary" type="submit">
        {isSignup ? "Sign up" : "Log in"}
      </Button>
      {isSignup && (
        <Button variant="link" onClick={() => setIsSignup(false)}>
          Cancel
        </Button>
      )}
    </Form>
  );
};

export default LoginForm;
