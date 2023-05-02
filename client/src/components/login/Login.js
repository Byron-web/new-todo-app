import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/*
This module exports a React functional component called "Login" that renders either a login form or a signup form based on the value of the "showLogin" state variable.
The component uses the "useState" hook to manage the "showLogin" state variable, which is initialized to "true" by default.
The component also imports the "LoginForm" and "SignupForm" components to render them based on the state of "showLogin".
Finally, the component renders the imported components within a Bootstrap container element.
*/

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleShowSignup = () => {
    setShowLogin(false);
  };

  return (
    <Container className="d-flex justify-content-center">
      <div className="w-50">
        {showLogin ? (
          <LoginForm handleShowSignup={handleShowSignup} />
        ) : (
          <SignupForm handleShowLogin={handleShowLogin} />
        )}
      </div>
    </Container>
  );
};

export default Login;
