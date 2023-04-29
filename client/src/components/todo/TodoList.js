import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/todo")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch todos");
        }
      })
      .then((data) => setTodos(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <h1 className="m-4">Todo List</h1>
      <ul>
        <TodoItem />
      </ul>
    </Container>
  );
};

export default TodoList;
