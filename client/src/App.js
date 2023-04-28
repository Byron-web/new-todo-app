import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import TodoList from "./components/todo/TodoList";

function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("api/users/auth")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Login />
      <div className="container mt-5">
        <h1>Todo List</h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
