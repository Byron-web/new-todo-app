import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import TodoList from "./components/todo/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  // useEffect(() => {
  //   fetch("/api/users/auth", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setIsLoggedIn(true);
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoggedIn(false);
  //       console.log(err);
  //     });
  // }, [token]);

  // const handleLogin = (token) => {
  //   setToken(token);
  //   setIsLoggedIn(true);
  // };
  return (
    <div className="App">
      {loggedIn}
      {loggedIn ? <TodoList /> : <Login />}
    </div>
  );
}

export default App;
