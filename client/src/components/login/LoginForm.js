import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { username, password };
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!res.ok) {
        setErrrorMessage((await res.json()).err);
        return;
      }
      document.cookie = `token=${(await res.json()).token}`;
      setLoggedIn(new Boolean(true));
    } catch (error) {
      console.log(error);
      setErrrorMessage("Failed to log in");
    }
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
      {loggedIn[0]}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="link" type="submit">
        Log in
      </Button>
    </Form>
  );
};

export default LoginForm;
