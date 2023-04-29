import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import TodoList from "./components/todo/TodoList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch("/api/users/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      });
  }, [token]);

  const handleLogin = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setToken("");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <TodoList token={token} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
