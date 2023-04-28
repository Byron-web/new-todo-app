import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const SignupForm = ({ show, handleClose, handleShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" />
      </Form.Group>
      <div className="d-flex justify-content-around align-items-center mb-3">
        <p className="m-0">Or</p>
        <Button variant="primary" onClick={handleShowLogin}>
          Log in
        </Button>
      </div>
      <Button variant="success" type="submit">
        Sign up
      </Button>
    </Form>
  );
};

export default SignupForm;
