import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import TodoList from "./components/todo/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      {loggedIn}
      {loggedIn ? <TodoList /> : <Login />}
    </div>
  );
}

export default App;
